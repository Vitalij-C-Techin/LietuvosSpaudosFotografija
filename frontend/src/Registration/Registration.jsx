import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";


//TODO email verification(backend needed with DB)
//TODO Password correction if needed
//TODO check layout after more work is done

function Registration() {
  const [selectedActivity, setSelectedActivity] = useState(``);
  const [phoneError, setPhoneError] = useState("");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "phone") {
      validatePhone(value);
    }

    if (
      name === "confirmPassword" ||
      (name === "password" && formData.confirmPassword)
    ) {
      const { password } = formData;
      const errors = [];
      const minPasswordLength = 6;
      const maxPasswordLength = 20;

      if (value !== password) {
        errors.push("Passwords do not match!");
      }
      if (
        value.length < minPasswordLength ||
        value.length > maxPasswordLength
      ) {
        errors.push(
          `Password must be between ${minPasswordLength} and ${maxPasswordLength} characters.`
        );
      }
      if (!/[A-Z]/.test(value)) {
        errors.push("Password must contain at least one uppercase letter.");
      }
      if (!/\d/.test(value)) {
        errors.push("Password must contain at least one number.");
      }

      setPasswordError(errors.join(" "));
    }
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;

    if (!phoneRegex.test(phone)) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordError) {
      console.log("Registration successfull");
    } else {
      alert("Fill form correctly");
    }
  };
  const handleChangeActivity = (e) => {
    setSelectedActivity(e.target.value);
  };

  return (
    <div className="Rforma">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        {phoneError && <p style={{ color: "red" }}>{phoneError}</p>}
        <label htmlFor="fname">Name*</label>
        <br />
        <input
          type="text"
          name="fname"
          id="fname"
          required
          placeholder="Enter name"
        />
        <br />
        <label htmlFor="lname">Surname*</label>
        <br />
        <input
          type="text"
          name="lname"
          id="lname"
          required
          placeholder="Enter surname"
        />
        <br />
        <label htmlFor="email">Email*</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="egzamle@egzample.com"
          autoComplete="email"
        />
        <br />
        <label htmlFor="psw">Password*</label>
        <br />
        <input
          type="password"
          name="password"
          id="psw"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          autoComplete="new-password"
        />
        <br />
        <label htmlFor="spsw">Confirm Password*</label>
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <br />
        <input
          type="password"
          name="confirmPassword"
          id="spsw"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          autoComplete="new-password"
        />
        <br />
        <label htmlFor="byear">Birth Year*</label>
        <br />
        <input
          type="date"
          name="byear"
          id="byear"
          required
          placeholder="Enter date of Birth"
        />
        <br />
        <label htmlFor="phone">Phone Number*</label>
        <br />
        <PhoneInput
          international
          id="phone"
          defaultCountry="LT"
          value={formData.phone}
          onChange={(value) => {
            setFormData((prevData) => ({ ...prevData, phone: value }));
            validatePhone(value);
          }}
        />
        <br />
        <label htmlFor="activity">State of work </label>
        <br />

        <select
          name="activity"
          id="activity"
          size={1}
          value={selectedActivity}
          onChange={handleChangeActivity}
        >
          <option value="fworker">freelancer</option>
          <option value="mworker">media worker</option>
        </select>
        <br />
        {selectedActivity === "mworker" && (
          <>
            <label htmlFor="wdyof">Who do you work for?</label>
            <br />
            <textarea
              name="message"
              cols="30"
              id="wdyof"
              rows="3"
              required
            ></textarea>
          </>
        )}
        <br />
        <input type="checkbox" id="Uagreement" name="Uagreement" required />
        <label htmlFor="Uagreement">User agreement</label>
        <br />

        <button>Submit</button>
      </form>
    </div>
  );
}

export default Registration;
