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

else if (type === "trainer") {
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
                    <div class="dropdown-options" id="skillDropdown"></div>
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

  const skillInput = document.getElementById("trainerSkillSet");
  const skillDropdown = document.getElementById("skillDropdown");
  let skillData = []; // store all skills fetched from backend

  const token = localStorage.getItem("token");
  if (!token) {
    alert("❌ No token found. Please login first.");
    return;
  }

  // Fetch all skills once
  const fetchSkills = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/skill/getAllskills", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.message || "Could not fetch skills");
        return;
      }

      skillData = result.data; // store full skill objects
      skillDropdown.innerHTML = "";

      skillData.forEach(skill => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${skill._id}"> ${skill.skillName}`;
        skillDropdown.appendChild(label);
      });
    } catch (err) {
      console.error("Fetch error:", err);
      alert("❌ Unable to fetch skills from backend");
    }
  };

  fetchSkills();

  // Toggle dropdown on click
  skillInput.addEventListener("click", () => {
    skillDropdown.style.display = skillDropdown.style.display === "block" ? "none" : "block";
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".multi-select")) skillDropdown.style.display = "none";
  });

  // Update input with selected skill names
  skillDropdown.addEventListener("change", () => {
    const selectedNames = Array.from(skillDropdown.querySelectorAll("input[type=checkbox]:checked"))
                               .map(cb => cb.nextSibling.textContent.trim());
    skillInput.value = selectedNames.join(", ");
  });

  // Submit trainer form
  const trainerForm = document.getElementById("trainerForm");
  trainerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const trainerName = document.getElementById("trainerName").value.trim();
    const email = document.getElementById("trainerEmail").value.trim();
    const password = document.getElementById("trainerPassword").value.trim();
    const phoneNumber = document.getElementById("trainerPhone").value.trim();
    const selectedSkills = Array.from(skillDropdown.querySelectorAll("input[type=checkbox]:checked"))
                                .map(cb => cb.value); // send IDs
    const proficiency = document.getElementById("courseLevel").value;
    const experience = Number(document.getElementById("experience").value);

    if (!trainerName || !email || !password || !phoneNumber || selectedSkills.length === 0 || !proficiency || !experience) {
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
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          trainerName,
          email,
          password,
          phoneNumber,
          skills: selectedSkills,
          proficiency,
          experience
        })
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
    } catch (err) {
      console.error("Server error:", err);
      Swal.fire({ icon: 'error', title: 'Server Error', text: 'Unable to connect to backend' });
    }
  });
}



 
else if (type === "course") {
  document.getElementById("pageTitle").innerText = "Add Course";
  content.innerHTML = `
    <div class="form-card">
        <h3>Add Course</h3>
        <form class="admin-form" id="courseForm">

            <div class="form-group">
                <label>Course Name</label>
                <input type="text" id="courseName" placeholder="Enter Course Name" required>
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
                    <input type="text" id="courseSkillSet" placeholder="Select Skills" readonly>
                    <div class="dropdown-options" id="skillDropdown"></div>
                </div>
            </div>

            <button type="submit" class="btn-save">Save</button>
        </form>
    </div>
  `;

  const skillInput = document.getElementById("courseSkillSet");
  const skillDropdown = document.getElementById("skillDropdown");

  // Fetch skills dynamically from backend
  skillInput.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ No token found. Please login first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/skill/getAllskills", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Could not fetch skills");
        return;
      }

      skillDropdown.innerHTML = ""; // clear old options

      result.data.forEach(skill => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="checkbox" value="${skill._id}"> ${skill.skillName}`;
        skillDropdown.appendChild(label);
      });

      skillDropdown.style.display = "block"; // show dropdown
    } catch (err) {
      console.error("Fetch error:", err);
      alert("❌ Unable to fetch skills from backend");
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".multi-select")) {
      skillDropdown.style.display = "none";
    }
  });

  // Update input value when selecting skills
  skillDropdown.addEventListener("change", () => {
    const selected = Array.from(skillDropdown.querySelectorAll("input[type=checkbox]:checked"))
                          .map(cb => cb.nextSibling.textContent.trim());
    skillInput.value = selected.join(", ");
  });

  // Course form submission
  const courseForm = document.getElementById("courseForm");
  courseForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const courseName = document.getElementById("courseName").value.trim();
    const description = document.getElementById("courseDescription").value.trim();
    const duration = document.getElementById("courseDuration").value.trim();
    const level = document.getElementById("courseLevel").value;
    const skills = Array.from(skillDropdown.querySelectorAll("input[type=checkbox]:checked"))
                        .map(cb => cb.value);

    if (!courseName || !description || !duration || !level || skills.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields including skills'
      });
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/admin/course/createCourse", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ courseName, description, duration, level, skills })
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({ icon: 'success', title: 'Success', text: data.message || 'Course created successfully' });
        courseForm.reset();
        skillInput.value = "";
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: data.message || 'Something went wrong' });
        console.error("Backend error:", data);
      }
    } catch (error) {
      console.error("Server error:", error);
      Swal.fire({ icon: 'error', title: 'Server Error', text: 'Unable to connect to backend' });
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

    const token = localStorage.getItem("token");

    console.log("token",token);
    

try {
  const response = await fetch("http://localhost:5000/api/admin/skill/createSkill", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`  // ✅ attach token here
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
      <h3>Add Batch</h3>
      <form id="batchForm" class="admin-form">

        <div class="form-group">
          <label>Batch Name</label>
          <input type="text" id="batchName" placeholder="Enter Batch Name" required>
        </div>

        <div class="form-group">
          <label>Start Date</label>
          <input type="date" id="startDate" required>
        </div>

        <div class="form-group">
          <label>End Date</label>
          <input type="date" id="endDate" required>
        </div>

        <div class="form-group">
          <label>Mode</label>
          <select id="mode" required>
            <option value="">Select Mode</option>
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">Offline</option>
          </select>
        </div>

        <div class="form-group">
          <label>Trainer</label>
          <input type="text" id="trainerField" placeholder="Select Trainer" readonly>
          <div class="dropdown-options" id="trainerDropdown"></div>
        </div>

        <div class="form-group">
          <label>Course</label>
          <input type="text" id="courseField" placeholder="Select Course" readonly>
          <div class="dropdown-options" id="courseDropdown"></div>
        </div>

        <button type="submit" class="btn-save">Save</button>
      </form>
    </div>
  `;

  const trainerField = document.getElementById("trainerField");
  const trainerDropdown = document.getElementById("trainerDropdown");
  const courseField = document.getElementById("courseField");
  const courseDropdown = document.getElementById("courseDropdown");

  const token = localStorage.getItem("token");
  if (!token) {
    alert("❌ No token found. Please login first.");
    return;
  }

  // Fetch trainers
  trainerField.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/trainer/getAllTrainer", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.message || "Could not fetch trainers");
        return;
      }

      trainerDropdown.innerHTML = "";
      result.data.forEach(trainer => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="trainer" value="${trainer._id}"> ${trainer.userId.userName}`;
        trainerDropdown.appendChild(label);
      });
      trainerDropdown.style.display = "block";
    } catch (err) {
      console.error("Fetch trainer error:", err);
      alert("❌ Unable to fetch trainers");
    }
  });

  // Fetch courses
  courseField.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/course/getCourse", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.message || "Could not fetch courses");
        return;
      }

      courseDropdown.innerHTML = "";
      result.data.forEach(course => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="course" value="${course._id}"> ${course.courseName}`;
        courseDropdown.appendChild(label);
      });
      courseDropdown.style.display = "block";
    } catch (err) {
      console.error("Fetch course error:", err);
      alert("❌ Unable to fetch courses");
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#trainerField")) trainerDropdown.style.display = "none";
    if (!e.target.closest("#courseField")) courseDropdown.style.display = "none";
  });

  // Update input when selecting trainer
  trainerDropdown.addEventListener("change", () => {
    const selected = trainerDropdown.querySelector("input[name=trainer]:checked");
    if (selected) trainerField.value = selected.nextSibling.textContent.trim();
  });

  // Update input when selecting course
  courseDropdown.addEventListener("change", () => {
    const selected = courseDropdown.querySelector("input[name=course]:checked");
    if (selected) courseField.value = selected.nextSibling.textContent.trim();
  });

  // Submit batch form
  const batchForm = document.getElementById("batchForm");
  batchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const trainerId = trainerDropdown.querySelector("input[name=trainer]:checked")?.value;
    const courseId = courseDropdown.querySelector("input[name=course]:checked")?.value;

    const batchData = {
      batchName: document.getElementById("batchName").value.trim(),
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
      mode: document.getElementById("mode").value,
      trainerId,
      courseId
    };

    if (!batchData.batchName || !batchData.startDate || !batchData.endDate || !batchData.mode || !trainerId || !courseId) {
      Swal.fire({ icon: "warning", title: "Missing Fields", text: "Please fill in all fields" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/batch/createBatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(batchData)
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({ icon: "success", title: "Success", text: result.message });
        batchForm.reset();
        trainerField.value = "";
        courseField.value = "";
      } else {
        Swal.fire({ icon: "error", title: "Error", text: result.message });
      }
    } catch (error) {
      console.error("Batch submit error:", error);
      Swal.fire({ icon: "error", title: "Server Error", text: "Could not create batch" });
    }
  });
}

}
