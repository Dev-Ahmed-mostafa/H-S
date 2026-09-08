const courses = [
    {
        id: 1,
        title: "Modern JavaScript From Zero",
        category: "Development",
        level: "Beginner",
        instructor: "Ahmed Hassan",
        lessons: 32,
        rating: 4.9,
        price: 29,
        icon: "⚡",
        description:
            "Learn JavaScript from the basics and build real interactive web applications."
    },

    {
        id: 2,
        title: "Complete UI/UX Design",
        category: "Design",
        level: "Intermediate",
        instructor: "Sarah Miller",
        lessons: 28,
        rating: 4.8,
        price: 35,
        icon: "🎨",
        description:
            "Learn how to create beautiful interfaces and meaningful user experiences."
    },

    {
        id: 3,
        title: "React for Frontend Developers",
        category: "Development",
        level: "Intermediate",
        instructor: "Daniel Smith",
        lessons: 41,
        rating: 4.9,
        price: 45,
        icon: "⚛️",
        description:
            "Build modern frontend applications using React, components, hooks and APIs."
    },

    {
        id: 4,
        title: "Digital Marketing Masterclass",
        category: "Marketing",
        level: "Beginner",
        instructor: "Emma Wilson",
        lessons: 25,
        rating: 4.7,
        price: 25,
        icon: "📣",
        description:
            "Understand modern digital marketing strategies and grow your online presence."
    },

    {
        id: 5,
        title: "Business Strategy Essentials",
        category: "Business",
        level: "Advanced",
        instructor: "Michael Brown",
        lessons: 19,
        rating: 4.8,
        price: 39,
        icon: "📈",
        description:
            "Learn how successful companies create strategies and make better decisions."
    },

    {
        id: 6,
        title: "Data Analysis with Python",
        category: "Data",
        level: "Intermediate",
        instructor: "David Lee",
        lessons: 36,
        rating: 4.9,
        price: 42,
        icon: "📊",
        description:
            "Analyze real datasets and discover useful insights using Python."
    }
];


const coursesGrid = document.getElementById("coursesGrid");
const courseSearch = document.getElementById("courseSearch");
const levelFilter = document.getElementById("levelFilter");

const modal = document.getElementById("courseModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const themeBtn = document.getElementById("themeBtn");

let selectedCategory = "All";


function renderCourses() {

    const searchValue = courseSearch.value.toLowerCase();
    const selectedLevel = levelFilter.value;

    const filteredCourses = courses.filter(course => {

        const matchesCategory =
            selectedCategory === "All" ||
            course.category === selectedCategory;

        const matchesLevel =
            selectedLevel === "All" ||
            course.level === selectedLevel;

        const matchesSearch =
            course.title.toLowerCase().includes(searchValue) ||
            course.category.toLowerCase().includes(searchValue);

        return (
            matchesCategory &&
            matchesLevel &&
            matchesSearch
        );
    });


    coursesGrid.innerHTML = "";


    if (filteredCourses.length === 0) {

        coursesGrid.innerHTML = `
            <p style="grid-column: 1/-1; text-align:center;">
                No courses found.
            </p>
        `;

        return;
    }


    filteredCourses.forEach(course => {

        const card = document.createElement("article");

        card.className = "course-card";

        card.innerHTML = `
            <div
                class="course-image"
                style="
                    background: linear-gradient(
                        135deg,
                        #eeeaff,
                        #dcd7ff
                    );
                "
            >
                ${course.icon}
            </div>

            <div class="course-body">

                <span class="course-category">
                    ${course.category}
                </span>

                <h3 class="course-title">
                    ${course.title}
                </h3>

                <p class="course-description">
                    ${course.description}
                </p>

                <div class="course-meta">
                    <span>👨‍🏫 ${course.instructor}</span>
                    <span>${course.lessons} lessons</span>
                </div>

                <div class="course-footer">
                    <strong class="price">
                        $${course.price}
                    </strong>

                    <span class="rating">
                        ⭐ ${course.rating}
                    </span>
                </div>

            </div>
        `;


        card.addEventListener("click", () => {
            openCourse(course);
        });


        coursesGrid.appendChild(card);
    });
}


function openCourse(course) {

    modalBody.innerHTML = `
        <span class="course-category">
            ${course.category}
        </span>

        <h2 style="margin: 10px 0 15px;">
            ${course.title}
        </h2>

        <p style="color: var(--muted);">
            ${course.description}
        </p>

        <div style="
            margin-top: 25px;
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
        ">
            <span>👨‍🏫 ${course.instructor}</span>
            <span>📚 ${course.lessons} Lessons</span>
            <span>⭐ ${course.rating}</span>
            <span>💰 $${course.price}</span>
        </div>

        <button
            class="primary-btn"
            style="
                border: 0;
                margin-top: 30px;
                cursor: pointer;
            "
        >
            Enroll now →
        </button>
    `;

    modal.classList.add("show");
}


closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});


modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


courseSearch.addEventListener("input", renderCourses);

levelFilter.addEventListener("change", renderCourses);


document.querySelectorAll(".category").forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelector(".category.active")
            ?.classList.remove("active");

        button.classList.add("active");

        selectedCategory =
            button.dataset.category;

        renderCourses();
    });

});


document.getElementById("searchBtn")
    .addEventListener("click", () => {

        document
            .getElementById("courses")
            .scrollIntoView({
                behavior: "smooth"
            });

        courseSearch.value =
            document.getElementById("heroSearch").value;

        renderCourses();
    });


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    themeBtn.textContent =
        document.body.classList.contains("dark")
            ? "☀"
            : "☾";

});


renderCourses();