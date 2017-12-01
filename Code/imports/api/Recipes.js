export const Recipes = new Mongo.Collection('recipes');

Recipes.allow({
  insert: function(userId, doc) {
    return !!userId;
  },
  update: function(userId, doc){
    return !!userId;
  }
});

//Turn into Tags
Tags = new SimpleSchema({
  entry: {
      type: String
  },
  type: {
      type: String
  },
  tag: {
      type: String
  }
});
//------------------------------------------------------------


//------------------------------------------------------------

//Turn Recipe into notes
RecipeSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    label: "Date",
    autoValue: function() {
      return new Date()
    },
    autoform: {
    }
  },
  name: {
    type: String,
    label: "Name"
  },

  desc: {
    type: String,
    label: "Description"
  },

  Tags: {
    type: [Tags]
  },

  inMenu: {
    type: Boolean,
    defaultValue: false,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },

  author:{
    type: String,
    label: "Author",
    autoValue: function() {
      return this.userId
    },
    autoform: {
      type: "hidden"
    }

  }
});

//method allows you to add something to the menu
Meteor.methods({
    toggleMenuItem: function(id, currentState){
      Recipes.update(id, {
        $set: {
          inMenu: !currentState
        }
      });
    },
    deleteRecipe: function(id) {
      Recipes.remove(id);
    }
});

Recipes.attachSchema( RecipeSchema );
