package com.cinema_stash.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.cinema_stash.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private JwtService jwtService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
				throws ServletException, IOException {
		final String authHeader = request.getHeader("Authorization");
		final String jwtToken;
		final String email;
		
		if(authHeader == null || !authHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}
		
		//extract token
		jwtToken = authHeader.substring(7);
		email = jwtService.extractEmail(jwtToken);
		
		//if email exists but not authentication exist
		if(email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			var userDetails = userRepo.findByEmail(email)
					.orElseThrow(()-> new RuntimeException("User Not Found!"));
			
			//validate the token
			if(jwtService.isTokenValid(jwtToken, userDetails)) {
				
//				Create authentication
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
						userDetails, 
						null, 
						userDetails.getAuthorities()
				);
				
//				Set authentication details
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				//updated security context
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
			
		}
		filterChain.doFilter(request, response);
	}
	

}
