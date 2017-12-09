import firebase from '../lib/firebase'
import  DRAG_Z_INDEX  from '../lib/constants'
import _ from 'lodash'


export default nextZIndex

let notes = [];
firebase.database()
    .ref('/tables')
    .once('value')
    .then((snapshot) => {
        notes = _.map(snapshot.val(), (key)=> {
            var result = snapshot.val()[key];
            "object" === typeof result ? result.key = key : result = {_key: key, val: result};
            return result
        })
    });

function maxZIndex() {
    return notes.reduce((a, b)=> {
        return b.zIndex === DRAG_Z_INDEX ? a : Math.max(a, b.zIndex)
    }, 0)
}
function nextZIndex() {
    return _.isNaN(maxZIndex())? 1:maxZIndex()+1
}