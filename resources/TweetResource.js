const Resource = require('resources.js');
 
class TweetResource extends Resource {
  toArray() {
    return {
      id: this._id,
      tweet: this.content,
      liked_by: this.likes.length
    }
  }
}
 
module.exports = TweetResource;