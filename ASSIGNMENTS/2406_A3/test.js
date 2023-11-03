function usernameCheck(username) {

    // str1 = "1momo"            -> false
    // str2 = "mohamad radaideh" -> false
    // str3 = "momo"             -> true
    // str4 = "!@#$%^&*()_+{}"   -> false
  
    // if (!(username.indexOf(' ') >= 0) || username === '' || !username) {
    //   return false;
    // }
    
    //check if username starts with letter
    // result = (str) => str.length === 1 && str.match(/[a-z]/i);
    // if (!result(username.charAt(0))) {
    //   return false;
    // }
  
    //check if name has only numbers and letters
    for (let i = 0; i < username.length; i++) {
      let value = username.charCodeAt(i)

      
      //check if character is a number (0...9)
      if (48 <= value && value <= 57) {
        if (i === 0) {
          return false;
        }
        continue
      }
  
      //check if it is a capital letter (A, B C ..)
      else if (65 <= value && value<= 90) {
        continue;
      }
  
      //check if it is a lowercase letter (a, b c ..)
      else if (97 <= value && value <= 122) {
        continue;
      }
  
      else {
        return false;
      }
    }
  
    return true
    
  }


//TEST  --> ALL FAIL

str1 = "1momo" //-> false
//str2 = "mohamad radaideh" //-> false
str3 = "momo" //-> true
str4 = "!@#$%^&*()_+{}" //-> false

console.log(usernameCheck(str1))
console.log(usernameCheck(str2))
console.log(usernameCheck(str3))
console.log(usernameCheck(str4))




  