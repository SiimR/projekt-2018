package ee.ttu.tarkvaratehnika.model;

public class Quiz {
	
	private String name;
	private String reference;
	
	public Quiz(String name, String reference) {
		this.name = name;
		this.reference = reference;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getReference() {
		return reference;
	}

	public void setReference(String reference) {
		this.reference = reference;
	}

}
