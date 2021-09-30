//importing libraries
import * as promptSync from 'prompt-sync';

// instantiate prompt which help the user to pass some data to the program 
// sigint : true means that the program respond to ctrl-c signal which will terminate the process

const prompt = promptSync({ sigint: true });

// testCases : it's an array that we are going to use in order to order our test cases by defining each test case as an object 

/*
testCase : {
    n: number => number of lines where each line represents a word
    m : number => length of a word
    bitmap : number [] => array of words 
}
*/
var testCases: Array<{ n: number, m: number, bitmap: string[] }> = [];

//testCasesNumber : number => number of case 
var testCasesNumber = 0;



const showOutput=(result: number [],wordLen:number):void =>{
    /*
        * function name : showOutput
        * Description : print the result to the user 
        * parameters :
            * result : number [] => the array of several distances
            * wordlen: number    => the length of a word
        * return : void  
    */ 


    let wordPosition = wordLen-1; 
    let output ='';
    for(let i =0;i<result.length;i++){
        output+=result[i]+" ";
        if(i===wordPosition){
            output+=" \n";
            wordPosition+=wordLen;
        }
    }
    console.log('\n')
    console.log(output)
}





const calculateDistance = (testCase: Object): number[] => {
        /*
        * function name : calculateDistance
        * Description : calculate the distance between each 0 and the closest white pixel
        * parameters :
            * testCase: Object    => a testCase
        * return : an array of distances 
    */ 

    let distanceArray: number[] = [];
    testCase['bitmap'].map(word => {
        for (let i = 0; i < word.length; i++) {
            let positionsOfWhitePixels:number[]=[];
            for (let j = 0; j < word.length; j++) {
                if(word[j]==='1'){
                    positionsOfWhitePixels.push(Math.abs(i-j));
                }
            }
            distanceArray.push(Math.min(...positionsOfWhitePixels))
        }
    })
    return distanceArray;
}

const main = (): void => {
  /*
        * function name : main
        * Description : it's our main function which contains the input of data and the call of multiple functions that we have done in our program
        * parameters : {}
        * return : void
    */ 



    while (testCasesNumber < 1 || testCasesNumber > 1000) {
        testCasesNumber = parseInt(prompt('guess a number of test cases :  ').toString());
    }
    let i = 0;
    while (i < testCasesNumber) {

        let n = 0
        let m = 0

        while ((n < 1 || n > 182) && (m < 1 || m > 182)) {
            let pair = prompt(`guess a pair of test case  ${i} `).split(' ').slice(0, 2);
            n = parseInt(pair[0].replace(/\s+$/g, '').toString());
            m = parseInt(pair[1].replace(/\s+$/g, '').toString());
        }

        let arrayOfWords: string[] = [];

        for (let i = 0; i < n; i++) {
            let word: string = '';
            while (word.length !== m) {
                word = prompt(`give a word of a single bitmap of line  ${i} `);
            }
            arrayOfWords.push(word);
        }
        testCases.push({ n: n, m: m, bitmap: arrayOfWords })
        i++;
    }

    testCases.map(testCase => {
        const result = calculateDistance(testCase);
        showOutput(result,testCase.m);
    })



    process.exit()
}

main()