$(document).ready(function () {

//  NEW JOB CREATION  /////////////////////////////////////////
    $("#new").on("click", function () {
        $("#target").html("")
        $("#target1").html("")
        addJob();
    })

    function addJob() {
        var input1 = $("<input id='jobNo' placeholder='Job Number'>")
        var input2 = $("<input id='loc' placeholder='Location'>")
        var addBtn = ("<button id='addJob'>Add</button>")
        $("#target").prepend(input1, input2, addBtn)
        var number = $("#jobNo")
        var jobloc = $("#loc")
        $("#addJob").on("click", function () {
            var newJob = {
                number: number.val().trim(),
                location: jobloc.val().trim()
            }
            newBag(newJob)
        })
    }

    function newBag(data) {
        $.post("/api/jobs", data)
    }
///////////////////////////////////////////////////////////////
//  JOB LOCATION UPDATE  //////////////////////////////////////
    $("#scan").on("click", function () {
        $("#target").html("")
        $("#target1").html("")
        scanJob();
    })

    function updateLocation(loc) {
        $.ajax({
            method: "PUT",
            url: "/api/jobs",
            data: loc
        })
    }

    function scanJob() {
        var input1 = $("<input placeholder='Job Number'>")
        var input2 = $("<input id='newLoc' placeholder='New Location'>")
        var scanBtn = ("<button id='scanJob'>Scan</button>")
        $("#target").prepend(input1, input2, scanBtn)
        $("#scanJob").on("click", function () {
            $.get("/api/jobs", scanData)
            function scanData(data) {
                var input = $("input")
                for (var i = 0; i < data.length; i++) {
                    if (data[i].number === input.val().trim()) {
                        var newLoc = $("#newLoc")
                        var id = data[i].id
                        var updateLoc = {};
                        updateLoc.id = id
                        updateLoc.location = newLoc.val().trim()
                        updateLocation(updateLoc)
                    }
                }
            }
        })
    }
///////////////////////////////////////////////////////////////
//  JOB LOCATION FIND  ////////////////////////////////////////
    $("#find").on("click", function () {
        $("#target").html("")
        $("#target1").html("")
        findJob();
    })

    function findJob() {
        var blankInput = $("<input>")
        var findBtn = $("<button id='findJob'>Find</button>")
        $("#target").prepend(blankInput, findBtn)
        $("#findJob").on("click", function () {
            $.get("/api/jobs", getData)
            function getData(data) {
                var input = $("input")
                for (var i = 0; i < data.length; i++) {
                    if (data[i].number === input.val().trim()) {
                        var loc = data[i].location
                        $("#target").html(loc)
                    }
                }
            }
        })
    }
})