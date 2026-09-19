async function getData() {
    try {
        const APIData = await fetch("sampleDB.json")
        const data = await APIData.json()
        return data
    } catch (error) {
        return `Error: ${error}`
    }
}


async function render() {
    /** @type { object } */
    const data = await getData()
    /** @type { object[] } */
    const courses = data.courses
    /** @type { object[] } */
    const types = data.types
    const courseList = document.getElementById("course-list")
    let html = ""
    function renderCourses() {
        /** @param { object } course */
        courses.forEach(course => {
            
            html += `
                <article class="course-item">
                    <div class="course-cover">
                        <span class="badge">${course.badge}</span>
                        <i class="${course.fontsAwesomeTitle}"></i>
                        <strong>${course.lang}</strong>
                    </div>
                    <div class="course-content">
                        <div class="course-meta">
                            <span>${course.category}</span>
                            <b>•</b><span>${course.level}</span>
                        </div>
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                        <div class="course-bottom">
                            <strong>$${course.price} ${course.currency}</strong>
                            <button class="course-action" type="button" aria-label="Open course">
                                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            </button>
                        </div>
                    </div>
                </article>
            `
        })
        courseList.innerHTML = html
    }
    renderCourses()
}