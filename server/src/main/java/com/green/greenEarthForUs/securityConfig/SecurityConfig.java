package com.green.greenEarthForUs.securityConfig;

import com.green.greenEarthForUs.login.handler.UserAccessDeniedHandler;
import com.green.greenEarthForUs.login.userdetails.CustomUserDetailsService;
import com.green.greenEarthForUs.login.util.UserAuthenticationEntryPoint;
import com.green.greenEarthForUs.login.util.CustomAuthorityUtils;
import com.green.greenEarthForUs.login.filter.JwtAuthenticationFilter;
import com.green.greenEarthForUs.login.jwttoken.JwtTokenizer;
import com.green.greenEarthForUs.login.filter.JwtVerificationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig{
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(JwtTokenizer jwtTokenizer,
                          CustomAuthorityUtils authorityUtils,
                          CustomUserDetailsService userDetailsService){
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                                .antMatchers("/auth/login").permitAll()
                        .antMatchers(HttpMethod.POST, "/user/").permitAll()
//                        .antMatchers(HttpMethod.GET, "/user/*").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.PATCH, "/user/*").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.DELETE, "/user/*").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.POST, "/post/*").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.PATCH, "/post/**").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.DELETE, "/post/**").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.POST, "/comment/**").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.PATCH, "/comment/**").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.DELETE, "/comment/**").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.POST, "/vote/*").hasRole("ADMIN")
//                        .antMatchers(HttpMethod.GET, "vote/**").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.PATCH, "/vote/**").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.DELETE, "/vote/**").hasRole("ADMIN")
//                        .antMatchers(HttpMethod.POST, "/calendar/**").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.GET, "/calendar/**").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.PATCH, "/calendar/**").hasAnyRole("ADMIN", "USER")
//                        .antMatchers(HttpMethod.DELETE, "/calendar/**").hasAnyRole("ADMIN", "USER")
                        .anyRequest().permitAll()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){

        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept"));
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager aUthenticationManager = builder.getSharedObject(AuthenticationManager.class);
            JwtAuthenticationFilter jwtAuthenticationFilter =
                    new JwtAuthenticationFilter(aUthenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }


}
