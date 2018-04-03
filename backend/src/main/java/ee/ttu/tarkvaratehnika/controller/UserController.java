package ee.ttu.tarkvaratehnika.controller;

import static ee.ttu.tarkvaratehnika.configuration.ApplicationProperties.API_PREFIX;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ee.ttu.tarkvaratehnika.model.UserModel;
import ee.ttu.tarkvaratehnika.service.UserService;

@RestController
@RequestMapping(API_PREFIX + "/users")
public class UserController {
	
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<UserModel> register(@RequestBody UserModel newUserDetails) {
		if (newUserDetails.getName().length() < 3) {
			throw new RuntimeException("Sample exception thrown in case user name is shorter than 3 characters.");
		}
		
		return ResponseEntity.ok(newUserDetails);
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserModel> login(@RequestBody UserModel loginDetails) {
		return ResponseEntity.ok(userService.findLogin(loginDetails.getName(), loginDetails.getPasswordHash()));
	}
	
	@PostMapping("/logout")
	public ResponseEntity<UserModel> logout(@RequestBody UserModel loginDetails) {
		return ResponseEntity.ok(loginDetails);
	}
	
	@Autowired
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}
