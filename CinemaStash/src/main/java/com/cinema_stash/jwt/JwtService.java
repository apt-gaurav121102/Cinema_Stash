package com.cinema_stash.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	
	@Value("${jwt.secret}")
	private String secretKey;
	
	@Value("${jwt.expiration}")
	private Long jwtExpiration;
	
	public String extractEmail(String jwtToken) {
		return extractClaim(jwtToken, Claims::getSubject);
	}
	
	public <T> T extractClaim(String jwtToken, Function<Claims, T> claimResolver) {
		final Claims claims = extractAllClaims(jwtToken);
		return claimResolver.apply(claims);
	}
	
	private Claims extractAllClaims(String jwtString) {
		return Jwts.parser()
				.verifyWith(getSignInKey())
				.build()
				.parseSignedClaims(jwtString)
				.getPayload();
	}
	
	public SecretKey getSignInKey() {
		return Keys.hmacShaKeyFor(secretKey.getBytes());
	}
	
	public String generateToken(UserDetails userDetails) {
		return generateToken(new HashMap<>(), userDetails);
	}
	public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
		return Jwts.builder()
				.claims(extraClaims)
				.subject(userDetails.getUsername())
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + jwtExpiration))
				.signWith(getSignInKey())
				.compact();
	}
	
	public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
		final String email = extractEmail(jwtToken);
		return(userDetails.getUsername().equals(email) && !isTokenExpired(jwtToken));
	}
	
	private boolean isTokenExpired(String jwtToken) {
		return extractExpiration(jwtToken).before(new Date());
	}
	private Date extractExpiration(String jwtToken) {
		return extractClaim(jwtToken, Claims::getExpiration);
	}	
}