import numberToBanglaMonth from './numberToBanglaMonth';

const banglaLifespan = (object) => {
    let lifespan = ""
    if (object['birthDay'] != "") {
        lifespan += object['birthDay'] + " ";
    }
    if (object['birthMonth'] != ""){
        lifespan += numberToBanglaMonth(object['birthMonth']) + " ";
    }
    lifespan += object['birthYear'];
    if (object['deathYear'] != "") {
        lifespan += " - "
        if (object['deathDay'] != "") {
            lifespan += object['deathDay'] + " ";
        }
        if ( object['deathMonth'] != "") {
            lifespan += numberToBanglaMonth(object['deathMonth']) + " ";
        }
        lifespan += object['deathYear'];
    }
    return lifespan;
}
export default banglaLifespan;