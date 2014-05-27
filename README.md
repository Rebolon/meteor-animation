Meteor Animation

A pattern to animate your template based on database events (insert / update / remove)

Can be used with MagicCss from https://github.com/miniMAC/magic
Just include the css required

To add animation you need to:
 * alter the template that display item: animatorAutomation.alterTemplate(Template.myItemTemplate);
 * alter the cursor used to retrieve data to display: animatorAutomation.alterCursorObserver(myCursor);
 * on server side, alter collection authorization: animatorAutomation.alterCollectionAllow(myCollection);

If you want to manage your own animation, just overload the following 3 methods:
 * animatorAutomation.effectOnAdded(selector, item)
 * animatorAutomation.effectOnRemoved(selector, item, timeout)
 * animatorAutomation.effectOnChanged(selector, item)

The block that will be animated must be idenfied by the following attribute id: id="{{_id}}". This is a mandatory to allow the package to work.
Actually if you have your own collection.allow system, be aware that the remove property will be overloaded. This is a part that might be modified in future.

A sample is available on http://magiccss4meteor.meteor.com/
That's quite simple but it shows quite well how to use it.

Have fun and please gieve me feedback and do PullRequest !
