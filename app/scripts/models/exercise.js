define([
        'backbone'
    ],
    function(Backbone) {
        var ExerciseModel = Backbone.Model.extend({
            defaults:{
                name               : 'Example question',
                prompt             : 'How would you categorize this question?',
                source             : 'uz',
                type_id            : 1,
                num_responses      : 36,
                num_participants   : 98,
                num_presentations  : 36,
                sample_size_method : 'presentations'
            }
        });

        return ExerciseModel;
    });