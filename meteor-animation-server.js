/**
 * 
 */
animatorAutomation = {
  alterCollectionAllow: function (collection) {
    // default behavior on insecure mode
    if (!collection._validators
	  || !collection._validators.insert.allow
	  || collection._validators.insert.allow.length < 1) {
      collection.allow({
	insert: function (userId, document) {
	  return true;
	}
      });
    }

    if (!collection._validators
        || !collection._validators.update.allow
	|| collection._validators.update.allow.length < 1) {
      collection.allow({
        update: function (userId, document) {
          return true;
        }
      });
    }

    // behavior for the animation
    collection.allow({
      remove: function (userId, document) {
        if (document._removeAnimationPlayed === true) {
          return true;
        } else {
          collection.update(document._id, {$set: {_removeAnimationPlayed: false}});
          return false;
        }
      }
    });
  }
}
