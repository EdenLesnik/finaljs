function updateTime() {
    const israelDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" });
    const usaDate = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const chinaDate = new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" });
    const franceDate = new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" });

    const israelTime = new Date(israelDate).toLocaleTimeString("he-IL");
    const usaTime = new Date(usaDate).toLocaleTimeString("en-US");
    const chinaTime = new Date(chinaDate).toLocaleTimeString("zh-CN");
    const franceTime = new Date(franceDate).toLocaleTimeString("fr-FR");

    document.getElementById("israel-time").textContent = israelTime;
    document.getElementById("usa-time").textContent = usaTime;
    document.getElementById("china-time").textContent = chinaTime;
    document.getElementById("france-time").textContent = franceTime;

    document.getElementById("israel-greeting").textContent = getGreeting(israelDate);
    document.getElementById("usa-greeting").textContent = getGreeting(usaDate);
    document.getElementById("china-greeting").textContent = getGreeting(chinaDate);
    document.getElementById("france-greeting").textContent = getGreeting(franceDate);
}

function getGreeting(dateString) {
    const date = new Date(dateString);
    const hour = date.getHours();
    if (hour < 12) {
        return "בוקר טוב"; // Good Morning in Hebrew
    } else if (hour < 18) {
        return "צהריים טובים"; // Good Afternoon in Hebrew
    } else {
        return "ערב טוב"; // Good Evening in Hebrew
    }
}

function ex1(name) {
    const currentDate = new Date();
    const greeting = `${getGreeting(currentDate)}, ${name}`;
    document.getElementById("ex1-result").textContent = greeting;
}

function ex2() {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours later
    document.getElementById("ex2-result").textContent = `Current Date: ${currentDate.toLocaleString()}; Future Date: ${futureDate.toLocaleString()}`;
}

function ex3() {
    const cities = [
        { name: "New York", timeZone: "America/New_York" },
        { name: "Paris", timeZone: "Europe/Paris" },
        { name: "Shanghai", timeZone: "Asia/Shanghai" },
        { name: "Jerusalem", timeZone: "Asia/Jerusalem" },
    ];

    let result = "";
    cities.forEach(city => {
        const currentTime = new Date().toLocaleString("en-US", { timeZone: city.timeZone });
        result += `${city.name}: ${currentTime}\n`;
    });

    document.getElementById("ex3-result").textContent = result;
}

function ex4() {
    const timeZonePairs = [
        { name1: "New York", timeZone1: "America/New_York", name2: "Jerusalem", timeZone2: "Asia/Jerusalem" },
        { name1: "Paris", timeZone1: "Europe/Paris", name2: "Shanghai", timeZone2: "Asia/Shanghai" },
    ];

    let result = "";
    timeZonePairs.forEach(pair => {
        const time1 = new Date().toLocaleString("en-US", { timeZone: pair.timeZone1 });
        const time2 = new Date().toLocaleString("en-US", { timeZone: pair.timeZone2 });
        result += `${pair.name1}: ${time1}; ${pair.name2}: ${time2}\n`;
    });

    document.getElementById("ex4-result").textContent = result;
}

function ex5() {
    const cities = [
        { name: "New York", timeZone: "America/New_York" },
        { name: "Paris", timeZone: "Europe/Paris" },
        { name: "Shanghai", timeZone: "Asia/Shanghai" },
        { name: "Jerusalem", timeZone: "Asia/Jerusalem" },
    ];

    let result = ":תאריכים וזמנים שונים במדינות שונות\n";
    cities.forEach(city => {
        const currentDate = new Date();
        const futureDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate());
        const futureTime = futureDate.toLocaleString("en-US", { timeZone: city.timeZone });
        result += `${city.name}: ${futureTime}\n`;
    });

    document.getElementById("ex5-result").textContent = result;
}
//------- CALLS
ex1("עדן");
ex2();
ex3();
ex4();
ex5();

setInterval(updateTime, 1000);

updateTime();