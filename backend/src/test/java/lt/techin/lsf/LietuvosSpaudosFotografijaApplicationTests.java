package lt.techin.lsf;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class LietuvosSpaudosFotografijaApplicationTests {

	private final ApplicationContext applicationContext;

	@Autowired
	public LietuvosSpaudosFotografijaApplicationTests(ApplicationContext applicationContext) {
		this.applicationContext = applicationContext;
	}

	@Test
    public void contextLoads() {
		assertThat(applicationContext.getBeanDefinitionCount()).isGreaterThan(10);
	}
}
