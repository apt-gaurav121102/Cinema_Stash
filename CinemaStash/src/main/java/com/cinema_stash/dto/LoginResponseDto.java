package com.cinema_stash.dto;

public class LoginResponseDto {
    private String jwtToken;
    private Long userId;
    private String username;
    private String role;
    private String message;

    private LoginResponseDto(Builder builder) {
        this.jwtToken = builder.jwtToken;
        this.userId = builder.userId;
        this.username = builder.username;
        this.role = builder.role;
        this.message = builder.message;
    }

    
	public LoginResponseDto(String jwtToken, Long userId, String username, String role, String message) {
		super();
		this.jwtToken = jwtToken;
		this.userId = userId;
		this.username = username;
		this.role = role;
		this.message = message;
	}


	public static class Builder {
        private String jwtToken;
        private Long userId;
        private String username;
        private String role;
        private String message;

        public Builder jwtToken(String jwtToken) {
            this.jwtToken = jwtToken;
            return this;
        }

        public Builder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public Builder role(String role) {
            this.role = role;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public LoginResponseDto build() {
            return new LoginResponseDto(this);
        }
    }

    // getters only
    public String getJwtToken() { return jwtToken; }
    public Long getUserId() { return userId; }
    public String getUsername() { return username; }
    public String getRole() { return role; }
    public String getMessage() { return message; }
}