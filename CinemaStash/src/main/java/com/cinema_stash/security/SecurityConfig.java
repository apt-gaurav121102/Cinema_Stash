package com.cinema_stash.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cinema_stash.jwt.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults()) // enable CORS
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Allow preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Public endpoints (read-only)
                .requestMatchers(HttpMethod.GET, "/movies/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/shows/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/theaters/**").permitAll()
                // Allow only the specific booking read used by the frontend to fetch booked seats
             // Booking endpoints
                .requestMatchers(HttpMethod.GET, "/bookings/myBookings").authenticated()
                .requestMatchers(HttpMethod.GET, "/bookings/getShowsBooking/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/bookings/**").authenticated()
                .requestMatchers(HttpMethod.PUT, "/bookings/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/bookings/**").authenticated()


                // Auth endpoints
                .requestMatchers("/auth/**").permitAll() // login/register

                // Admin-only endpoints
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/movies/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/movies/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/movies/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/shows/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/shows/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/shows/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/theaters/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/theaters/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/theaters/**").hasRole("ADMIN")

                // All other booking endpoints require authentication (create/cancel etc.)

                // Any other request requires authentication
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
