document.addEventListener("DOMContentLoaded", function(){
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", function () {
    sidebar.classList.toggle("closed");
});

    loadForm('dashboard');
});

function loadForm(type) {
    const content = document.getElementById("content-area");
    if (type === "dashboard") {
    document.getElementById("pageTitle").innerText = "Dashboard";
    content.innerHTML = `
      <div class="dashboard-container">
            <div class="marquee">
                <h2>Training and Batch Management System </h2>
                <br><br>
            </div>
        <div class="dashboard-cards">

            <div class="dash-card">
                <div class="icon">
                    <i class="fa-solid fa-user-graduate"></i>
                </div>
                <h2>25</h2>
                <p>Trainees</p>
            </div>

            <div class="dash-card">
                <div class="icon">
                    <i class="fa-solid fa-chalkboard-user"></i>
                </div>
                <h2>10</h2>
                <p>Trainers</p>
            </div>

            <div class="dash-card">
                <div class="icon">
                    <i class="fa-solid fa-book"></i>
                </div>
                <h2>8</h2>
                <p>Courses</p>
            </div>

            <div class="dash-card">
                <div class="icon">
                    <i class="fa-solid fa-lightbulb"></i>
                </div>
                <h2>15</h2>
                <p>Skills</p>
            </div>

        </div> 
    `;
}
/*else if (type === "trainer") {
    document.getElementById("pageTitle").innerText = "Add Trainer";
    content.innerHTML = `
    <div class="form-card">
        <h3>Add Trainer</h3>
        <form class="admin-form" id="trainerForm">

            <div class="form-group">
                <label>Trainer Name</label>
                <input type="text" id="trainerName" placeholder="Enter Trainer Name" required>
            </div>

            <div class="form-group">
                <label>Email ID</label>
                <input type="email" id="trainerEmail" placeholder="Enter Email" required>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" id="trainerPassword" placeholder="Enter Password" required>
            </div>


            <div class="form-group">
                <label>Phone Number</label>
                <input type="text" id="trainerPhone" placeholder="Enter Phone Number" required>
            </div>

            <div class="form-group">
                <label>Skills</label>
                 <div class="multi-select">
                     <input type="text" id="trainerSkillSet" placeholder="Select Skills" readonly>
                     <div class="dropdown-options" id="skillDropdown">
                       <label><input type="checkbox" value="Core Java"> Core Java</label>
                       <label><input type="checkbox" value="Python"> Python</label>
                       <label><input type="checkbox" value="Data Science"> Data Science</label>
                       <label><input type="checkbox" value="Cyber Security"> Cyber Security</label>
                       <label><input type="checkbox" value="DevOps"> DevOps</label>
                       <label><input type="checkbox" value="Cloud Computing"> Cloud Computing</label>
                       <label><input type="checkbox" value="SAP S/4 HANA"> SAP S/4 HANA</label>
                       <label><input type="checkbox" value="SAP BTP"> SAP BTP</label>
            </div>
            </div>
            </div>


            <div class="form-group">
                <label>Proficiency</label>
                <select id="courseLevel" required>
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>            
                </div>
            <div class="form-group">
                <label>Experience</label>
                <input type="text" id="experience" placeholder="Enter Experience in Years" required>
            </div>



            <button type="submit" class="btn-save">Save</button>

        </form>
    </div>
    `;
    const skillInput = document.getElementById("trainerSkillSet");
    const dropdown = document.getElementById("skillDropdown");
    const checkboxes = dropdown.querySelectorAll("input[type='checkbox']");

    // Toggle dropdown
    skillInput.addEventListener("click", function () {
       dropdown.classList.toggle("show");
    });

    // Update input value
    checkboxes.forEach(cb => {
    cb.addEventListener("change", function () {
        const selected = [];
        checkboxes.forEach(c => {
            if (c.checked) selected.push(c.value);
        });
        skillInput.value = selected.join(", ");
    });
});

// Close dropdown when clicking outside
    document.onclick=function (e) {
    if (!e.target.closest(".multi-select")) {
        dropdown.classList.remove("show");
    }
};

    const form = document.getElementById("trainerForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const trainerData = {
            trainerName: document.getElementById("trainerName").value,
            email: document.getElementById("trainerEmail").value,
            phoneNumber: document.getElementById("trainerPhone").value,
            experience: document.getElementById("experience").value,
        };
         const token=localStorage.getItem("token");
         console.log(token);
         try {
            const response = await fetch("http://localhost:5000/api/admin/trainer/createTrainer", {
                method: "POST",
                headers: {
                     "Content-Type": "application/json",
                      "Authorization": "Bearer " + token
                },
                body: JSON.stringify(trainerData),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Trainer created successfully!",
                    confirmButtonColor: "#3085d6"
                });
                form.reset();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: result.message
                });
            }
        } catch (error) {
            console.error("Fetch error:", error);
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Could not connect to server"
            });
        }
    });
    form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // collect selected skills
    const selectedSkills = [];
    document.querySelectorAll("#skillDropdown input:checked")
        .forEach(cb => selectedSkills.push(cb.value));

    const trainerData = {
        trainerName: document.getElementById("trainerName").value,
        email: document.getElementById("trainerEmail").value,
        password: document.getElementById("trainerPassword").value,
        phoneNumber: document.getElementById("trainerPhone").value,
        skills: selectedSkills,
        proficiency: document.getElementById("courseLevel").value,
        experience: document.getElementById("experience").value,
    };

    const token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:5000/api/admin/trainer/createTrainer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(trainerData),
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Trainer created successfully!",
                confirmButtonColor: "#3085d6"
            });
            form.reset();
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: result.message || "Creation failed"
            });
        }
    } catch (error) {
        console.error("Fetch error:", error);
        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Could not connect to server"
        });
    }
});

}*/
// Assuming you already have `content` div and type check
if (type === "trainer") {
  document.getElementById("pageTitle").innerText = "Add Trainer";
  content.innerHTML = `
    <div class="form-card">
        <h3>Add Trainer</h3>
        <form id="trainerForm" class="admin-form">

            <div class="form-group">
                <label>Trainer Name</label>
                <input type="text" id="trainerName" placeholder="Enter Trainer Name" required>
            </div>

            <div class="form-group">
                <label>Email ID</label>
                <input type="email" id="trainerEmail" placeholder="Enter Email" required>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" id="trainerPassword" placeholder="Enter Password" required>
            </div>

            <div class="form-group">
                <label>Phone Number</label>
                <input type="text" id="trainerPhone" placeholder="Enter Phone Number" required>
            </div>

            <div class="form-group">
                <label>Skills</label>
                <div class="multi-select">
                    <input type="text" id="trainerSkillSet" placeholder="Select Skills" readonly>
                    <div class="dropdown-options" id="skillDropdown">
                        <label><input type="checkbox" value="Java"> Java</label>
                        <label><input type="checkbox" value="Python"> Python</label>
                        <label><input type="checkbox" value="Data Science"> Data Science</label>
                        <label><input type="checkbox" value="Cyber Security"> Cyber Security</label>
                        <label><input type="checkbox" value="DevOps"> DevOps</label>
                        <label><input type="checkbox" value="Cloud Computing"> Cloud Computing</label>
                        <label><input type="checkbox" value="SAP S/4 HANA"> SAP S/4 HANA</label>
                        <label><input type="checkbox" value="SAP BTP"> SAP BTP</label>
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label>Proficiency</label>
                <select id="courseLevel" required>
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                </select>            
            </div>

            <div class="form-group">
                <label>Experience (Years)</label>
                <input type="number" id="experience" placeholder="Enter Experience in Years" required>
            </div>

            <button type="submit" class="btn-save">Save</button>

        </form>
    </div>
  `;

  // Multi-select skills logic
  const skillInput = document.getElementById("trainerSkillSet");
  const skillDropdown = document.getElementById("skillDropdown");

  skillInput.addEventListener("click", () => {
    skillDropdown.style.display = skillDropdown.style.display === "block" ? "none" : "block";
  });

  skillDropdown.querySelectorAll("input[type=checkbox]").forEach(chk => {
    chk.addEventListener("change", () => {
      const selected = Array.from(skillDropdown.querySelectorAll("input[type=checkbox]:checked"))
                            .map(c => c.value);
      skillInput.value = selected.join(", ");
    });
  });

  // Form submission logic
  const trainerForm = document.getElementById("trainerForm");
  trainerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const trainerName = document.getElementById("trainerName").value.trim();
    const email = document.getElementById("trainerEmail").value.trim();
    const password = document.getElementById("trainerPassword").value.trim();
    const phoneNumber = document.getElementById("trainerPhone").value.trim();
    const skills = Array.from(skillDropdown.querySelectorAll("input[type=checkbox]:checked")).map(c => c.value);
    const proficiency = document.getElementById("courseLevel").value;
    const experience = Number(document.getElementById("experience").value);

    if (!trainerName || !email || !password || !phoneNumber || skills.length === 0 || !proficiency || !experience) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields'
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/trainer/createTrainer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainerName, email, password, phoneNumber, skills, proficiency, experience })
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({ icon: 'success', title: 'Success', text: data.message || 'Trainer created successfully' });
        trainerForm.reset();
        skillInput.value = "";
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: data.message || 'Something went wrong' });
        console.error("Backend error:", data);
      }

    } catch (error) {
      console.error("Connection error:", error);
      Swal.fire({ icon: 'error', title: 'Server Error', text: 'Unable to connect to backend' });
    }
  });
}

 /* else if (type === "course") {
    document.getElementById("pageTitle").innerText = "Add Course";
    content.innerHTML = `
   /* <div class="form-card">
        <h3>Add Course</h3>
        <form class="admin-form" id="courseForm">

            <div class="form-group">
                <label>Course Offered</label>
                <select id="courseLevel" required>
                    <option value="">Select Course</option>
                    <option value="Java Full Stack">Java Full Stack</option>
                    <option value="Python Full Stack">Python Full Stack</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="SAP S/4 HANA">SAP S/4 HANA</option>
                    <option value="SAP BTP">SAP BTP</option>
                </select>
            </div>

            <div class="form-group">
                <label>Description</label>
                <input type="text" id="courseDescription" placeholder="Enter Description" required>
            </div>

            <div class="form-group">
                <label>Duration</label>
                <input type="text" id="courseDuration" placeholder="Enter Duration" required>
            </div>

            <div class="form-group">
                <label>Level</label>
                <select id="courseLevel" required>
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
            <div class="form-group">
                <label>Skills</label>
                 <div class="multi-select">
                     <input type="text" id="trainerSkillSet" placeholder="Select Skills" readonly>
                     <div class="dropdown-options" id="skillDropdown">
                    const skillsMap = {
    "Java Full Stack": ["Core Java", "Spring Boot", "Hibernate", "JSP", "Servlet"],
    "Python Full Stack": ["Python", "Django", "Flask", "FastAPI"],
    "Data Science": ["Python", "Pandas", "NumPy", "Machine Learning"],
    "Cyber Security": ["Network Security", "Ethical Hacking", "Kali Linux"],
    "DevOps": ["Docker", "Kubernetes", "Jenkins", "CI/CD"],
    "Cloud Computing": ["AWS", "Azure", "GCP"],
    "SAP S/4 HANA": ["ABAP", "Fiori", "HANA DB"],
    "SAP BTP": ["CAPM", "CDS", "Fiori Elements"]
};


const courseSelect = document.getElementById("courseLevel");
const skillDropdown = document.getElementById("skillDropdown");
const skillInput = document.getElementById("trainerSkillSet");

courseSelect.addEventListener("change", function () {
    const selectedCourse = this.value;
    skillDropdown.innerHTML = ""; // clear old skills
    skillInput.value = ""; // clear input box

    if (skillsData[selectedCourse]) {
        skillsData[selectedCourse].forEach(skill => {
            const label = document.createElement("label");
            label.innerHTML = '<input type="checkbox" value="'+skill"'> +skill;
            skillDropdown.appendChild(label);
        });
    }
});

skillDropdown.addEventListener("change", function () {
    const checkedSkills = Array.from(
        skillDropdown.querySelectorAll("input[type='checkbox']:checked")
    ).map(cb => cb.value);

    skillInput.value = checkedSkills.join(", ");
});
               </div>
               </div>
            </div>
 
            <button type="submit" class="btn-save">Save</button>
        </form>
    </div>
    `;

    const form = document.getElementById("courseForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const courseData = {
            courseName: document.getElementById("courseName").value,
            description: document.getElementById("courseDescription").value,
            duration: document.getElementById("courseDuration").value,
            level: document.getElementById("courseLevel").value,
        };

        try {
            const response = await fetch("http://localhost:5000/api/admin/course/createCourse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseData),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Course created successfully!",
                    confirmButtonColor: "#3085d6"
                }).then(() => {
                    form.reset();
                    loadForm("trainerSkill");   
    });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: result.message
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Could not connect to server"
            });
        }
    });
}
*/
 
else if (type === "course") {
    document.getElementById("pageTitle").innerText = "Add Course";
    content.innerHTML = `
    <div class="form-card">
        <h3>Add Course</h3>
        <form class="admin-form" id="courseForm">

            <!-- Course Name Dropdown -->
            <div class="form-group">
                <label>Course Offered</label>
                <select id="courseName" required>
                    <option value="">Select Course</option>
                    <option value="Java Full Stack">Java Full Stack</option>
                    <option value="Python Full Stack">Python Full Stack</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="SAP S/4 HANA">SAP S/4 HANA</option>
                    <option value="SAP BTP">SAP BTP</option>
                </select>
            </div>

            <div class="form-group">
                <label>Description</label>
                <input type="text" id="courseDescription" placeholder="Enter Description" required>
            </div>

            <div class="form-group">
                <label>Duration</label>
                <input type="text" id="courseDuration" placeholder="Enter Duration" required>
            </div>

            <div class="form-group">
                <label>Level</label>
                <select id="courseLevel" required>
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            <div class="form-group">
                <label>Skills</label>
                <div id="skillDropdown">
                    <label>
                        <input type="checkbox" value="698a8c331d9a9215099d13ea"> Core Java
                    </label>
                    <label>
                        <input type="checkbox" value="698a8ca61d9a9215099d13ec"> Spring Boot
                    </label>
                    <label>
                        <input type="checkbox" value="698a8cc71d9a9215099d13ee"> Hibernate
                    </label>
                    <label>
                        <input type="checkbox" value="698a8ce41d9a9215099d13f0"> Docker
                    </label>
                    <label>
                        <input type="checkbox" value="698a8d031d9a9215099d13f2"> AWS
                    </label>
                </div>
            </div>

            <button type="submit" class="btn-save">Save</button>
        </form>
    </div>
    `;

    const form = document.getElementById("courseForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // collect selected skill ids
        const checkedSkills = Array.from(
            document.querySelectorAll("#skillDropdown input:checked")
        ).map(cb => cb.value);

        const courseData = {
            courseName: document.getElementById("courseName").value,
            description: document.getElementById("courseDescription").value,
            duration: document.getElementById("courseDuration").value,
            level: document.getElementById("courseLevel").value,
            skills: checkedSkills
        };

        try {
            const response = await fetch(  "http://localhost:5000/api/admin/course/createCourse",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(courseData),
                });
                

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Course created successfully!",
                    confirmButtonColor: "#3085d6"
                }).then(() => {
                    form.reset();
                    loadForm("trainerSkill");
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: result.message
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Could not connect to server"
            });
        }
    });
}



 
  else if (type === "trainee") {
    document.getElementById("pageTitle").innerText = "Add Trainee";
    content.innerHTML = `
    <div class="form-card">
        <h3>Add Trainee</h3>
        <form class="admin-form" id="traineeForm">

            <div class="form-group">
                <label>Trainee Name</label>
                <input type="text" id="traineeName" placeholder="Enter Trainee Name" required>
            </div>

            <div class="form-group">
                <label>Email ID</label>
                <input type="email" id="email" placeholder="Enter Email" required>
            </div>

            <div class="form-group">
                <label>Phone Number</label>
                <input type="text" id="phoneNumber" placeholder="Enter Phone Number" required>
            </div>

            <div class="form-group">
                <label>Qualification</label>
                <input type="text" id="qualification" placeholder="Enter Qualification">
            </div>

            <button type="submit" class="btn-save">Save</button>

        </form>
        <p id="traineeMessage"></p>
    </div>
    `;

    const form = document.getElementById("traineeForm");
    const message = document.getElementById("traineeMessage");
    form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const traineeData = {
        traineeName: document.getElementById("traineeName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        qualification: document.getElementById("qualification").value,
    };

    try {
        const response = await fetch("http://localhost:5000/admin/trainee/createTrainee", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(traineeData),
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Trainee created successfully!",
                confirmButtonColor: "#3085d6"
            });
            form.reset();
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: result.message
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "Could not connect to server"
        });
    }
});

}


/*    else if (type === "skill") {
        document.getElementById("pageTitle").innerText = "Add Skill";
        content.innerHTML = `
        <div class="form-card">
            <h3>Add Skill</h3>
            <form class="admin-form">

                <div class="form-group">
                    <label>Skill Name</label>
                    <input type="text" placeholder="Enter Skill Name" required>
                </div>

                <div class="form-group">
                    <label>Description</label>
                    <input type="text" placeholder="Enter Description" required>
                </div>

              <div class="form-group">
                <label>Category</label>
                <select required>
                  <option value="Select Category">Select Category</option>
                  <option value="Development">Development</option>
                  <option value="Testing">Testing</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Consultant">Consultant</option>
                </select>
            </div>


                <button type="submit" class="btn-save">Save</button>

            </form>
        </div>
        `;
    }*/
   // Assuming you already have `content` div and type check
else if (type === "skill") {
  document.getElementById("pageTitle").innerText = "Add Skill";
  content.innerHTML = `
    <div class="form-card">
        <h3>Add Skill</h3>
        <form id="skillForm" class="admin-form">

            <div class="form-group">
                <label>Skill Name</label>
                <input type="text" id="skillName" placeholder="Enter Skill Name" required>
            </div>

            <div class="form-group">
                <label>Description</label>
                <input type="text" id="description" placeholder="Enter Description" required>
            </div>

            <div class="form-group">
                <label>Category</label>
                <select id="category" required>
                  <option value="">Select Category</option>
                  <option value="Development">Development</option>
                  <option value="Testing">Testing</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Consultant">Consultant</option>
                </select>
            </div>

            <button type="submit" class="btn-save">Save</button>

        </form>
    </div>
  `;

  // Add JS logic for form submission
  const skillForm = document.getElementById("skillForm");
  skillForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const skillName = document.getElementById("skillName").value.trim();
    const description = document.getElementById("description").value.trim();
    const category = document.getElementById("category").value;

    if (!skillName || !description || !category) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields',
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/skill/createSkill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ skillName, description, category }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message || 'Skill created successfully',
        });
        skillForm.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Something went wrong',
        });
        console.error("Backend error:", data);
      }

    } catch (error) {
      console.error("Connection error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'Unable to connect to backend',
      });
    }
  });
}



    else if (type === "batch") {
        document.getElementById("pageTitle").innerText = "Add Batch";
        content.innerHTML = `
        <div class="form-card">
            <h3>Add Course Skills</h3>
            <form class="admin-form">

                <div class="form-group">
                    <label>Batch Name</label>
                    <input type="text" placeholder="Enter Batch Name" required>
                </div>
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="date" placeholder="Enter Start Date" required>
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="date" placeholder="Enter End Date" required>
                </div>
                <div class="form-group">
                    <label>Mode</label>
                    <select required>
                       <option value="">Select Level</option>
                       <option value="Online">Online</option>
                       <option value="Offline">Offline</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Trainer Name</label>
                    <input type="text" placeholder="Enter Trainer Name" required>
                </div>
                <div class="form-group">
                    <label>Course Name</label>
                    <input type="text" placeholder="Enter Course Name" required>
                </div>

                <button type="submit" class="btn-save">Save</button>

            </form>
        </div>
        `;
    }
}
