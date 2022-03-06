import axios from 'axios';
import { navigateTo } from './navigation';

async function createARea(action, reaction) {
    console.log(action);
    console.log(reaction);
    await axios.post(
        "https://api.yep-area.cf/widgets/update",
        {
            widgets: [
                {
                    content: action.content,
                    enabled: action.enabled,
                    family: 'action',
                    uuid: action.uuid,
                    type: action.type,
                    user_uuid: action.user_uuid,
                    childrens: action.childrens
                },
                {
                    content: reaction.content,
                    enabled: reaction.enabled,
                    family: 'reaction',
                    uuid: reaction.uuid,
                    type: reaction.type,
                    user_uuid: reaction.user_uuid
                }
            ]
        }, {
        headers: {
            'Authorization': global.access_token
        }
    }).then((result) => { console.log("Victory ! The result is: " + result)})
        .catch((error) => { console.log("Oh noooo ! I'm sorry but: " + error.response.data.message); throw 'e' });
}

export {
    createARea,
}