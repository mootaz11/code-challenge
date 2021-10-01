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




    let wordPosition = wordLen-1;                   // instantiate wordPosition by assigning the first 'm' pixels 
    let output ='';                                 // affecting '' to the output
    for(let i =0;i<result.length;i++){              // loop over the array of distances 
        output+=result[i]+" ";                      // concatenating every distance to the output
        if(i===wordPosition){                       // if we achieved the length of each word we assign \n 
            output+=" \n";                      
            wordPosition+=wordLen;                  // increment wordPosition
        }
    }
    console.log('\n')                                   
    console.log(output)                             // console the output to the user



}







const calculateDistance = (testCase: Object): number[] => {
        /*
        * function name : calculateDistance
        * Description : calculate the distance between each 0 and the closest white pixel
        * parameters :
            * testCase: Object    => a testCase
        * return : an array of distances 
    */ 

    let distanceArray: number[] = [];                                   // instantiate an array of number called distanceArray
    testCase['bitmap'].map(word => {                                    // map the bitmap attribute which contains the set of words
        for (let i = 0; i < word.length; i++) {                         // loop each word
            let DistanceOfWhitePixels:number[]=[];                      // instantiate an array which will contain the distance between the white pixels an the pixel in word[i]
            for (let j = 0; j < word.length; j++) {         
                if(word[j]==='1'){
                    DistanceOfWhitePixels.push(Math.abs(i-j));  
                }
            }
            distanceArray.push(Math.min(...DistanceOfWhitePixels))      // push the minimal distance to  the distance array
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



    while (testCasesNumber < 1 || testCasesNumber > 1000) {                                        // prompt the number of tests , in this case the program will accept only the number that varies between 1 and 1000
        testCasesNumber = parseInt(prompt('guess a number of test cases :  ').toString());
    }
    let i = 0;
    while (i < testCasesNumber) {                                                                  // we are going now to prompt the other input data 'testCasesNumber' times

        let n = 0
        let m = 0

        while ((n < 1 || n > 182) && (m < 1 || m > 182)) {                                          // prompt n and m which will only varies between 1 and 182 
            let pair = prompt(`guess a pair of test case  ${i} `).split(' ').slice(0, 2);           // divides the input in a list of substrings and slice the first 2 numbers in the case of prompting more than 2 numbers 
            n = parseInt(pair[0].replace(/\s+$/g, '').toString());                                  // replace space and general to '' to avoid user input problems
            m = parseInt(pair[1].replace(/\s+$/g, '').toString());
        }

        let arrayOfWords: string[] = [];                                                            //instantiate arrayOfWords which will contain the words 

        for (let i = 0; i < n; i++) {
            let word: string = '';
            while (word.length !== m) {
                word = prompt(`give a word of a single bitmap of line  ${i} `);
            }
            arrayOfWords.push(word);
        }
        testCases.push({ n: n, m: m, bitmap: arrayOfWords })                                        // to organize our work we have pushed each testcase to testCases array 
        i++;
    }

    testCases.map(testCase => {                                                                     // now we are going to handle each test case and console the output
        const result = calculateDistance(testCase);             
        showOutput(result,testCase.m);
    })



    process.exit()                                                                                 // finally exit the program
}




main()                                                                                             // call our main function