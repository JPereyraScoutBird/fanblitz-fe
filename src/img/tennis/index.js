import Logo0 from './tennis0.jpg';
import Logo1 from './tennis1.jpg';
import Logo2 from './tennis2.jpg';
import Logo3 from './tennis3.jpg';
import Logo4 from './tennis4.jpg';
import Logo5 from './tennis5.jpg';
import Logo6 from './tennis6.jpg';
import Logo7 from './tennis7.jpg';
import Logo8 from './tennis8.jpg';
import Logo9 from './tennis9.jpg';
import Logo10 from './tennis10.jpg';
import Logo11 from './tennis11.jpg';

const randomPhoto = () =>{
    var randomNumber = Math.random();
    var randonRange = Math.floor(randomNumber * 12);

    if (0 == randonRange){
        return Logo0
    }
    if (1 == randonRange){
        return Logo1
    }
    if (2 == randonRange){
        return Logo2
    }
    if (3 == randonRange){
        return Logo3
    }
    if (4 == randonRange){
        return Logo4
    }
    if (5 == randonRange){
        return Logo5
    }
    if (6 == randonRange){
        return Logo6
    }
    if (7 == randonRange){
        return Logo7
    }
    if (8 == randonRange){
        return Logo8
    }
    if (9 == randonRange){
        return Logo9
    }
    if (10 == randonRange){
        return Logo10
    }
    return Logo11
}

export default {
    Logo0,
    Logo1,
    Logo2,
    Logo3,
    Logo4,
    Logo5,
    Logo6,
    Logo7,
    Logo8,
    Logo9,
    Logo10,
    Logo11,
    randomPhoto
}