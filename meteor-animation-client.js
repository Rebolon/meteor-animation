/**
 * 
 * mandatory: div to animate must have id like #{{_id}} to enable the animatorAutomation to retreive them
 *
 * @TODO find a way to store the property _ ouside the document property
 * @TODO remove animation should also change that property and then recall the remove function
 *
 */
animatorAutomation = {
  collectionState: {},

  effectOnAdded: function (selector, item) {
    // check to prevent effect when added coz removed has been refused server-side
    if (item._removeAnimationPlayed === undefined) {
      $(selector).removeClass().addClass('magictime swashIn');
    }
  },

  effectOnRemoved: function (selector, item, timeout) {
    // play animation
    $(selector).removeClass().addClass('magictime swashOut');
    // and remove finally the item
    Meteor.setTimeout(function () {
      Members.update(item._id, {$set: {_removeAnimationPlayed: true}}, function () {
        Members.remove(item._id);
      });
    }, timeout);
  },

  effectOnChanged: function (selector, item) {
    $(selector).removeClass().addClass('magictime vanishIn');
  },

  alterTemplate: function (tpl, timeout) {
    var self = this;
    timeout = timeout || 1000;

    tpl.rendered = function () {
      var item = this.data;
      switch (self.collectionState[item._id]) {
        case 'added':
	  self.effectOnAdded('#' + item._id, item);
          break;
        case 'removed':
	  self.effectOnRemoved('#' + item._id, item, timeout);
          break;
        case 'changed':
	  self.effectOnChanged('#' + item._id);
          break;
        default:
      }

      // clear status
      self.collectionState[item._id] = null;
    };
  },

  alterCursorObserver: function (cursor) {
    var self = this;
    cursor.observe({
      added: function (newDocument) {
	// default behavior
        self.collectionState[newDocument._id] = 'added';
	// added for a removed next step coz first removed has been refused server-side
        if (newDocument._removeAnimationPlayed === false) {
          self.collectionState[newDocument._id] = 'removed';
        }
      },

      removed: function (oldDocument) {
        self.collectionState[oldDocument._id] = 'removed';
      },
	
      changed: function (newDocument, oldDocument) {
        // default behavior
        self.collectionState[newDocument._id] = 'changed';
	// changed for a removed next step
        if (newDocument._removeAnimationPlayed === false) {
          self.collectionState[newDocument._id] = 'removed';
        }
      }
    });
  },
};
