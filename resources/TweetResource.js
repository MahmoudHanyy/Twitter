const Resource = require('resources.js');
const { formatDate } = require('../utils/format.js')
 
class TweetResource extends Resource {
  toArray() {
    return {
      id: this._id,
      tweet: this.content,
      liked_by: this.likes.length,
      tweeted_at: formatDate(new Date(this.createdAt))
    }
  }
}
 
module.exports = TweetResource;