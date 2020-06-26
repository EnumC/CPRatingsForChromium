// LIVE
// var done = false;
console.log("Successfully loaded CALPOLYPROFESSOR extension");

function checkPage() {
    // if ($('iframe')[0] != null) {
    //     console.log(document.getElementsByTagName('iframe')[0]);
    //     if (document.getElementsByTagName('iframe')[0].contentWindow.document.documentElement.querySelectorAll('#ACE_DERIVED_REGFRM1_SSR_WAIT_LIST_ON').length > 0) {
    //         console.log('detected class section display');
    //         // console.log(document.getElementsByTagName('iframe')[0].contentWindow.document.documentElement);
    //         getInstructorInfo(document.getElementsByTagName('iframe')[0].contentWindow.document.documentElement);
    //     }
    //     else {
    //       console.log('no class section detected');
    //     }
    // }
    // else {
    //     console.log('iframe does not exist');
    // }
    getInstructorInfo(document);
    // if (!done) {
    setTimeout(checkPage, 1000);
    // }

}


checkPage();

function getInstructorInfo(page) {
    // console.log("Checking for instructors");
    var instructorsList = page.querySelectorAll('[id^="MTG_INSTR"]');
    // var counterA = 0;
    instructorsList.forEach(function (obj) {
        // console.log(obj);
        var name = extractName(obj.innerText);
        if (name != "undefined+undefined") {
            var newElement = document.createElement("a");
            newElement.innerHTML = obj.innerHTML;
            newElement.href = 'https://calpolyratings.com/?q=' + name;
            newElement.target = "_blank"; // open in new tab
            obj.parentNode.replaceChild(newElement, obj);
        }

        // var url = 'https://calpolyratings.com/?q=' + name;
        // var xhr = new XMLHttpRequest();
        // xhr.open("GET", url, false);
        // xhr.send();

        // var data = xhr.responseText;
        // console.log(xhr.status);
        // console.log(xhr.response);
        // console.log("RAW: ");
        // console.log(data);


        // $.get('https://calpolyratings.com/?q=' + name, function (data) {
        //   console.log(data);
        // });
        // counterA++;
        // if (counterA == instructorsList.length) {
        //   done = true;
        //   // end of list
        // }

    });
}


function extractName(fullName) {
    var sepName = fullName.split(' ');
    var firstName, midName, lastName;

    if (sepName.length == 2) {
        // First + Last Name Format
        firstName = sepName[0];
        midName = "undefined";
        lastName = sepName[1];
    }
    else if (sepName.length == 3) {
        // First + Middle + Last Name Format
        firstName = sepName[0];
        midName = sepName[1];
        lastName = sepName[2];
    }
    else {
        // most likely length == 1 which is staff
        firstName = "undefined";
        midName = "undefined";
        lastName = "undefined";
    }

    return firstName + "+" + lastName;
}

function getLink(data) {

    var arr = data.getElementById("small-teacher-profile-list-block").getElementsByTagName("a");
    // console.log("Array: ");
    // console.log(arr);
    var link = null;
    if (arr.length > 0) {
        link = data.getElementById("small-teacher-profile-list-block").getElementsByTagName("a")[0].href;
    }
    return link;
}

function getEvalNum(data) {
    return data.getElementsByClassName('evals-span')[0].getElementsByTagName("strong")[0].innerText;
}
