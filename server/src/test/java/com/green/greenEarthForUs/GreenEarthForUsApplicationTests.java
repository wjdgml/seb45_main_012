package com.green.greenEarthForUs;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.context.WebApplicationContext;

import java.nio.charset.StandardCharsets;

@SpringBootTest
@AutoConfigureMockMvc
class GreenEarthForUsApplicationTests {
	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private WebApplicationContext webApplicationContext;



	@Test
	void contextLoads() throws Exception{

		MockMultipartFile image = new MockMultipartFile(
				"image",
				"image.jpg",
				MediaType.IMAGE_JPEG_VALUE,
				"YourImageContent".getBytes(StandardCharsets.UTF_8)
		);

		ResultActions  actions = mockMvc.perform(MockMvcRequestBuilders.multipart("/image/api")
				.file(image));

		actions.andExpect(MockMvcResultMatchers.status().isOk());

	}



}
