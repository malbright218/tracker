$(document).ready(function () {

//  NEW JOB CREATION  /////////////////////////////////////////
    $("#new").on("click", function () {
        
        $("#target").html("")
        $("#target1").html("")
        addJob();
    })

    function addJob() {
        var input1 = $("<input class='form-control' id='jobNo' placeholder='Job Number'>")
        var input2 = $("<input class='form-control' id='loc' placeholder='Location'>")
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
            $("#jobNo").val("")
            $("#loc").val("")
            $("#jobNo").focus()
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
        var input1 = $("<input class='form-control' id='jobNum' placeholder='Job Number'>")
        var input2 = $("<input class='form-control' id='newLoc' placeholder='New Location'>")
        var scanBtn = ("<button id='scanJob'>Scan</button>")
        $("#target").prepend(input1, input2, scanBtn)
        $("#scanJob").on("click", function () {
            $.get("/api/jobs", scanData)
            function scanData(data) {
                var time = moment().format("YYYY-MM-DDThh:mm:ss")
                var input = $("input")
                for (var i = 0; i < data.length; i++) {
                    if (data[i].number === input.val().trim()) {
                        var newLoc = $("#newLoc")
                        var id = data[i].id
                        var updateLoc = {};
                        updateLoc.id = id
                        updateLoc.location = newLoc.val().trim()
                        updateLoc.updatedAt = time
                        updateLocation(updateLoc)

                        $("#jobNum").val("")
                        $("#newLoc").val("")
                        $("#jobNum").focus()
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
        var blankInput = $("<input class='form-control'>")
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
    
///////////////////////////////////////////////////////////////
//  VIEW ALL JOBS  ////////////////////////////////////////////
    $("#view").on("click", function () {
        
        $("#target").html("")
        $("#target1").html("")
        viewJob();
    })

    function viewJob() {
        $.get("/api/jobs", getData)
        function getData(data) {
            var blanktable = $("<table>")
                blanktable.addClass("table")
                var header = $("<thead>")
                var headrow = $("<tr>")
                var headcol1 = $("<th scope='col'>Job Number</th>")
                var headcol2 = $("<th scope='col'>Location</th>")
                headrow.append(headcol1, headcol2)
                header.append(headrow)
            for (var i = 0; i < data.length; i++) {
                var blankbody = $("<tbody>")
                var bodyrow = $("<tr>")
                var jobdata = $("<td>" + data[i].number + "</td>")
                var locdata = $("<td>" + data[i].location + "</td>")
                bodyrow.append(jobdata, locdata)
                blankbody.append(bodyrow)
                blanktable.append(header, blankbody)                
            }
            $("#target").append(blanktable)
        }
    }

})