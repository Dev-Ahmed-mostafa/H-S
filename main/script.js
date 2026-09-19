
async function getData() {
    const loadingPage = document.getElementById("loading-page")
    try {
        const APIData = await fetch("sampleDB.json")
        const data = await APIData.json()
        const app = document.getElementById("app")
        app.hidden = !1
        loadingPage.remove()
        return data
    } catch (error) {
        const loadStatus = document.querySelector(".loading-page")
        loadStatus.innerText = "Something went wrong ..."
        loadingPage.innerHTML += `<code>Error: ${error}</code>`
        return `Error: ${error}`
    }
}


async function render() {
    /** @type { object } */
    const data = await getData()
    /** @type { object[] } */
    const courses = data?.courses
    if (!Array.isArray(courses)) {
        return ;
    }
    const courseList = document.getElementById("course-list")
    const CTList = document.getElementById("CTList")
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
    
    function renderTypes() {
        /** @param { object } CType */
        let TypeList = courses.map(type => { return type.lang })

        let html = "";
        TypeList.forEach(TypeItem => {
            html += `
            <button class="type" type="button">
                <span>${TypeItem}</span>
                <i class="fa-solid fa-arrow-right"></i>
            </button>
            `
        })
        CTList.innerHTML = html
    }
    renderCourses()
    renderTypes()
}
render()