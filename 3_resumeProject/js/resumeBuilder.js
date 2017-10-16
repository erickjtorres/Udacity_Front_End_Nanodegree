//setting a global variable data to use instead of "%data%"
var data = "%data%";
//my personal information for my employer is here
var bio = {
    name: "Erick Torres",
    role: "Student at IIT",
    contacts: {
        mobile: "312-478-5453",
        email: "erick.torres44@gmail.com",
        github: "erickjtorres",
        twitter: "N/A",
        location: "Evanston, IL"
    },
    welcomeMessage: "Welcome to my resume!",
    skills: ["CSS", "HTML", "Javascript", "Java", "Swift"],
    biopic: "images/fry.jpg",
    display: function() {
        //HTMLheaderRole must be prepend first and then formattedHeaderName in order to prevent the contact information from going before
        //the name and title
        var formattedRole = HTMLheaderRole.replace(data, bio.role);
        $("#header").prepend(formattedRole);

        var formattedHeaderName = HTMLheaderName.replace(data, bio.name);
        $("#header:first").prepend(formattedHeaderName);

        var formattedMobile = HTMLmobile.replace(data, bio.contacts.mobile);
        $("#topContacts:last").append(formattedMobile);

        var formattedEmail = HTMLemail.replace(data, bio.contacts.email);
        $("#topContacts:last").append(formattedEmail);

        var formattedTwitter = HTMLtwitter.replace(data, bio.contacts.twitter);
        $("#topContacts:last").append(formattedTwitter);

        var formattedGithub = HTMLgithub.replace(data, bio.contacts.github);
        $("#topContacts:last").append(formattedGithub);

        var formattedLocation = HTMLlocation.replace(data, bio.contacts.github);
        $("#topContacts:last").append(formattedLocation);

        var formattedBioPic = HTMLbioPic.replace(data, bio.biopic);
        $("#header:last").append(formattedBioPic);

        var formattedWelcome = HTMLwelcomeMsg.replace(data, bio.welcomeMessage);
        $("#header:last").append(formattedWelcome);

        //to append multiple id tagged elements
        //can also add #topContacts
        $("#footerContacts").append(formattedMobile, formattedEmail, formattedGithub, formattedLocation);

        //start the skills
        $("#header:last").append(HTMLskillsStart);
        //loops through skills and replaces data with each skill in order to add them as a list to the resume
        for (var i = 0; i < bio.skills.length; i++) {
            var formattedSkills = HTMLskills.replace(data, bio.skills[i]);
            $("#skills:last").append(formattedSkills);
        }

    }
};

//my past education data is here
var education = {
    schools: [{
            name: "Illinois Institute of Technology",
            location: "Chicago, IL",
            degree: "Bachelors of Science",
            majors: ["Computer Science"],
            dates: "2016-Current",
        },
        {
            name: "Lincoln Park High School",
            location: "Chicago, IL",
            degree: "High School",
            majors: ["International Baccalaureate Program"],
            dates: "2012-2016",
        }
    ],
    onlineCourses: [{
        title: "Front-End Web Developer",
        school: "Udacity",
        dates: "2017-Current",
        url: "www.udacity.com"
    }],
    display: function() {
        //loop through the schools and place each element for each school in the correct HTML element
        for (var i = 0; i < education.schools.length; i++) {
            $("#education").append(HTMLschoolStart);

            var formattedSchoolName = HTMLschoolName.replace(data, education.schools[i].name);
            var formattedSchoolDegree = HTMLschoolDegree.replace(data, education.schools[i].degree);
            formattedSchoolName += formattedSchoolDegree;
            $(".education-entry:last").append(formattedSchoolName);

            var formattedSchoolLocation = HTMLschoolLocation.replace(data, education.schools[i].location);
            $(".education-entry:last").append(formattedSchoolLocation);


            var formattedSchoolDates = HTMLschoolDates.replace(data, education.schools[i].dates);
            $(".education-entry:last").append(formattedSchoolDates);

            //itterate through the majors array
            for (var j = 0; j < education.schools[i].majors.length; j++) {
            var formattedSchoolMajors = HTMLschoolMajor.replace(data, education.schools[i].majors[j]);
            $(".education-entry:last").append(formattedSchoolMajors);
        }

        }
        $("#education:last").append(HTMLonlineClasses);
        for (var k = 0; k < education.onlineCourses.length; k++) {
            $("#education").append(HTMLschoolStart);

            var formattedOnlineTitle = HTMLonlineTitle.replace(data, education.onlineCourses[k].title);
            var formattedOnlineSchool = HTMLonlineSchool.replace(data, education.onlineCourses[k].school);
            formattedOnlineTitle += formattedOnlineSchool;
            $(".education-entry:last").append(formattedOnlineTitle);

            var formattedOnlineDates = HTMLonlineDates.replace(data, education.onlineCourses[k].dates);
            $(".education-entry:last").append(formattedOnlineDates);

            var formattedOnlineUrl = HTMLonlineURL.replace(data, education.onlineCourses[k].url);
            $(".education-entry:last").append(formattedOnlineUrl);
        }

    }
};

//past and present work experience goes here
var work = {
    jobs: [{
            employer: "Limelight Catering",
            title: "Warehouse Management Assitant",
            location: "Chicago, IL",
            dates: "March 2017 - August 2017",
            description: "Helped manage warehouse equipment and assist in making schedules for catering events",
        },
        {
            employer: "SnapASong",
            title: "IOS Developer Intern",
            location: "Chicago, IL",
            dates: "June 2016 - September 2016",
            description: "Helped assist in the development of the start-up's iphone app and used wix to manage their website"
        }
    ],
    display: function() {
        for (var k = 0; k < work.jobs.length; k++) {
            $("#workExperience").append(HTMLworkStart);

            var formattedEmployer = HTMLworkEmployer.replace(data, work.jobs[k].employer);
            var formattedTitle = HTMLworkTitle.replace(data, work.jobs[k].title);
            formattedEmployer += formattedTitle;
            $(".work-entry:last").append(formattedEmployer);

            var formattedLocation = HTMLworkLocation.replace(data, work.jobs[k].location);
            $(".work-entry:last").append(formattedLocation);

            var formattedDates = HTMLworkDescription.replace(data, work.jobs[k].dates);
            $(".work-entry:last").append(formattedDates);

            var formattedDescription = HTMLworkDescription.replace(data, work.jobs[k].description);
            $(".work-entry:last").append(formattedDescription);
        }

    }
};

//relevant projects that are either in progress or done go here
var projects = {
    projects: [{
        title: "My Interactive Resume",
        dates: "August 2017-Current",
        description: "A simple resume",
        images: ["images/197x148.gif"]
    }],
    display: function() {
        //loops through every project and goes through every element in each project to add toward the website
        for (var i = 0; i < projects.projects.length; i++) {
            $("#projects").append(HTMLprojectStart);

            var formattedProjectTitle = HTMLprojectTitle.replace(data, projects.projects[i].title);
            $(".project-entry:last").append(formattedProjectTitle);

            var formattedProjectDates = HTMLprojectDates.replace(data, projects.projects[i].dates);
            $(".project-entry:last").append(formattedProjectDates);

            var formattedProjectDescription = HTMLprojectDescription.replace(data, projects.projects[i].description);
            $(".project-entry:last").append(formattedProjectDescription);

            //checking to make sure if the project has images. If it does not then the HTMLprojectImage code will not be added!
            if (projects.projects[i].images.length > 0) {
                //another loop must be created to add each image(therefore it must itterate through the array of images)
                for (var k = 0; k < projects.projects[i].images.length; k++) {
                    var formattedProjectImages = HTMLprojectImage.replace(data, projects.projects[i].images[k]);
                    $(".project-entry:last").append(formattedProjectImages);
                }
            }

        }

    }
};

//add the mapAPI to the project
$("#mapDiv").append(googleMap);

bio.display();
work.display();
projects.display();
education.display();
