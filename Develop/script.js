$(document).ready(function() {

    // testing
    const test = false;

    // acquire times from moment
    const now = moment().format('MMMM Do YYYY');

    // test in non-standard hours
    var nowHour24 = moment().format('H');
    var nowHour12 = moment().format('h');

    // setting times for hours after testing
    if (test) {
        nowHour24 = 13;
        nowHour12 = 1;
    }
    var $dateDisplay = $('#currentDay');
    $dateDisplay.text(now);

    // Get todos stored from local storage
    // parse the JSON string to an object
    var descriptionStore = JSON.parse(localStorage.getItem("descriptionStore"));

    if (test) {console.log(descriptionStore); }

    // If retrieval of plans was successful from localStorage, update plan array
    if (descriptionStore !== null) {
        testInput = descriptionStore;
    } else {
        textInput = new Array(9);
        textInput[4] = "Here is the app loading text";
    }

    if (test) { console.log("Long text input in the text box",textInput); }

    // set variable to reference the planner element
    var $scheduler = $('#scheduleInput');
    // clears the existing elements
    $scheduler.empty();
    
    If (test) { console.log("current time",nowHour12); }

    //callendar index display
    for (var hour = 9; hour <= 17; hour++) {
        var index = hour - 9;

        // building row elements
        var $rowContainer = $('<div>');
        $rowContainer.addClass('row');
        $rowContainer.addClass('plannerRow');
        $rowContainer.attr('hour-index',hour);

        // building time box rows
        var $timeBoxSpn = $('<span>');
        $timeBoxSpn.attr('class','timeBox');

        // formatting for hours display
        var displayHour = 0;
        var both = "";
        if (hour > 12) {
            displayHour = hour - 12;
            both = "pm";
        } else {
            displayHour = hour;
            both = "am";
        }

        // inserts time into timeBox
        $timeBoxSpn.text('${displayHour} ${both}');

        // insert into column in timeBox
        $rowContainer.append($col2TimeDiv);
        $col2TimeDiv.append($timeBoxSpn);

        // build row components
        var $textBoxEl = $('<textarea>');

        $textBoxEl.attr('id','textarea-${index}');
        $textBoxEl.attr('hour-index',index);
        $textBoxEl.attr('type','text');
        $textBoxEl.attr('class','textBoxSize');

        // get index from data array for hour
        $textBoxEl.val(textInput[index] );

        // control width of column
        let $col9IptDiv = $('<div>');
        $col9IptDiv.addClass('col-md-9');

        // add width to column and row
        $rowContainer.append($col9IptDiv);
        $col9IptDiv.append($textBoxEl);

        // building save portion of row
        let $col1SaveDiv = $('<div>');
        $col1SaveDiv.addClass('col-mg-1');

        let $saveBtn = $('<i>');
        $saveBtn.attr('id','saveid-${index}');
        $saveBtn.attr('save-id',index);

        // add width and row to saveBtn and SaveDiv
        $rowContainer.append($col1SaveDiv);
        $col1SaveDiv.append($saveBtn);

        // set row color consistent with time
        updateRowColor($rowContainer, hour);

        // add row to planner container
        $scheduler.append($rowContainer, hour);
    };
    
    // function to change color depending on time
    function updateRowColor ($hourRow,hour) {
        
        if (test) { console.log("rowColor",nowHour24,hour); }

        if ( hour < nowHour24) {
            if (test) { console.log("lessThan"); }
            $hourRow.css("background-color","lightgray")
        } else if ( hour > nowHour24) {
            if (test) { console.log("greaterthan"); }
            $hourRow.css("background-color","green")
        } else {
            if (test) { console.log("equal"); }
            $hourRow.css("background-color","red")
        }
    };

    // save to local storage
    $(document).on('click','i', function(event) {
        event.preventDefault();

        if (test) { console.log('click pta before '+textInput); }

        let $index = $(this).attr('save-id');

        let textareaId = '#textarea-'+$index;
        let $value = $(textareaId).val();

        textInput[$index] = $value;

        if (test) {console.log('value ', $value); }
        if (test) {console.log('index ', $index); }
        if (test) {console.log('click pta after '+ textInput); }

        // function to color save button on change of input
        $(document).on('change','textarea', function(event) {
            event.preventDefault();
            if (test) { console.log('onChange'); }
            if (test) { console.log('id', $(this).attr('hour-index')); }
        
            let i = $(this).attr('hour-index');

            $('#saveid-${i}').addClass('shadowPulse');
        });
});

import