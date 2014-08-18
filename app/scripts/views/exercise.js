define([
        'backbone',
        'mustache',
        'models/exercise',
        'templates'
    ],
    function(Backbone, Mustache, ExerciseModel, JST){

        var ExerciseView = Backbone.View.extend({
            className: 'container',
            model: new ExerciseModel(),
            presentationTemplate: JST['app/scripts/templates/exercisePresentation.mustache'](),
            editTemplate: JST['app/scripts/templates/exerciseEdit.mustache'](),
            initialize: function(){
                //pre-compiling the templates
                Mustache.parse(this.presentationTemplate);
                Mustache.parse(this.editTemplate);
            },
            events:{
                'click #edit'   : 'loadEditTemplate',
                'click #save'   : 'saveRecord',
                'click #cancel' : 'loadPresentationTemplate'
            },
            render: function() {
                this.loadPresentationTemplate();
//                this.loadEditTemplate();
                return this;
            },

            //loads template to present current model information
            loadPresentationTemplate:function(){
                var model                   = this.model.toJSON();
                model.type_id               = this.convertTypeId(model);
                model.sample_size_method    = this.convertSampleSizeMethod(model);

                var template                = Mustache.render(this.presentationTemplate, model);

                this.$el.html(template);
            },

            //loads template to support the editing of model properties.
            loadEditTemplate:function(){
                var model       = this.model.toJSON(),
                    template    =  Mustache.render(this.editTemplate, model );

                this.$el.html( template);

                //setting up the value onto the form
                this.$('select#type_id').val(model.type_id);

                this.$('input[name="sample_size_method"]')
                    .filter('[value="'+ model.sample_size_method + '"]')
                    .click();
            },

            //fetches the form's current values and save into a model
            saveRecord: function() {
                var values = {
                    name               : this.$('input#name').val(),
                    prompt             : this.$('textarea#prompt').val(),
                    source             : 'uz',
                    type_id            : + this.$('select#type_id').val(),
                    sample_size_method : this.$('input[name="sample_size_method"]:checked').val()
                };

                this.model.set(values);
                this.loadPresentationTemplate();
            },

            //converts type_id numeric values into corresponding String values
            convertTypeId:function(model){
                var type ;

                switch(model.type_id + ''){
                    case '1':
                        type = 'Categorical';
                        break;
                    case '2':
                        type = 'Rating Scale';
                        break;
                    case '3':
                        type = 'Time';
                        break;
                    case '4':
                        type = 'Open Ended';
                        break;
                }

                return type;
            },

            //converts sample_size_method sting values into corresponding numeric values
            convertSampleSizeMethod:function(model){
                var sampleValue;

                switch(model.sample_size_method){
                    case 'presentations':
                        sampleValue = model.num_presentations;
                        break;
                    case 'participants':
                        sampleValue = model.num_participants;
                        break;
                    case 'responses':
                        sampleValue = model.num_responses;
                        break;
                }

                return sampleValue;
            }
        });

        return ExerciseView;
    });