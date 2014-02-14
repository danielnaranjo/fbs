	// JQuery Tags
    $('#w').tagit();
    var sampleTags = "";
    var eventTags = $('#eventTags');
    var addEvent = function(text) {
        $('#events_container').append(text + '<br>');
    };
    eventTags.tagit({
        availableTags: sampleTags,
        beforeTagAdded: function(evt, ui) {
            if (!ui.duringInitialization) {
                addEvent('beforeTagAdded: ' + eventTags.tagit('tagLabel', ui.tag));
            }
        },
        afterTagAdded: function(evt, ui) {
            if (!ui.duringInitialization) {
                addEvent('afterTagAdded: ' + eventTags.tagit('tagLabel', ui.tag));
            }
        },
        beforeTagRemoved: function(evt, ui) {
            addEvent('beforeTagRemoved: ' + eventTags.tagit('tagLabel', ui.tag));
        },
        afterTagRemoved: function(evt, ui) {
            addEvent('afterTagRemoved: ' + eventTags.tagit('tagLabel', ui.tag));
        },
        onTagClicked: function(evt, ui) {
            addEvent('onTagClicked: ' + eventTags.tagit('tagLabel', ui.tag));
        },
        onTagExists: function(evt, ui) {
            addEvent('onTagExists: ' + eventTags.tagit('tagLabel', ui.existingTag));
        }
    });
    $('#readOnlyTags').tagit({
        readOnly: true
    });
    $('#methodTags').tagit();
    $('#allowSpacesTags').tagit({
        allowSpaces: true
    });
    $('#removeConfirmationTags').tagit({
        removeConfirmation: true
    });