class linkedList {
    constructor(data) {
      this.node = new node(data);
    }
  
    append(data) {
      if (this.node.value === null) {
        this.node.value = data;
        return;
      }
      this.tail().next = new node(data);
    }
  
    prepend(data) {
      let tempNode = new node(data);
      tempNode.next = this.node;
      this.node = tempNode;
    }
  
    tail() {
      let newNode = this.node;
      while (newNode.next !== null) {
        newNode = newNode.next;
      }
      return newNode;
    }
  
    size() {
      let length = 1;
      let newNode = this.node;
      while (newNode.next !== null) {
        newNode = newNode.next;
        length++;
      }
      return length;
    }
  
    head() {
      let newNode = this.node;
      return newNode;
    }
  
    pop() {
      let newNode = this.node;
      if (newNode.next === null) {
        newNode.value = null;
        return;
      }
      while (newNode.next.next !== null) {
        newNode = newNode.next;
      }
      newNode.next = null;
    }
  
    at(index) {
      let newNode = this.node;
      let value = newNode.value;
      for (let i = 0; i < index; i++) {
        newNode = newNode.next;
        value = newNode.value;
      }
      return value;
    }
  
    find(value) {
      let newNode = this.node;
      let index = 0;
      while (newNode.next !== null) {
        if (newNode.value.key === value) {
          return index;
        }
        index++;
        newNode = newNode.next;
      }
      if (newNode.value.key === value) {
        return index;
      }
      return null;
    }
  
    contains(value) {
      let newNode = this.node;
      while (newNode.next !== null) {
        if (newNode.value === value) {
          return true;
        }
        newNode = newNode.next;
      }
      if (newNode.value === value) {
        return true;
      }
      return null;
    }
  
    toString() {
      let newNode = this.node;
      while (newNode.next !== null) {
        process.stdout.write(`( ${newNode.value} ) -> `);
        newNode = newNode.next;
      }
      process.stdout.write(`( ${newNode.value} ) -> `);
      process.stdout.write(`( null ) `);
      console.log("");
    }
  
    remove(index) {
      let newNode = this.node;
      let size = this.size();
      let tempArr = [];
  
      // if(this.node.next === null || this.size() < index){
      //   return;
      // }
      for (let i = 0; i < size; i++) {
        if (!(i === index)) {
          tempArr.push(newNode.value);
        }
        newNode = newNode.next;
      }
      while (this.node.value) {
        this.pop();
      }
      for (let i = 0; i < size - 1; i++) {
        this.append(tempArr[i]);
      }
    }
  }
  
  class node {
    constructor(value) {
      if (value) {
        this.value = value;
      } else {
        this.value = null;
      }
      this.next = null;
    }
  }
  
  const names = [
    ["Alice", "hewiufhhxfewiyg"],
    ["Bob", "gbexrtyuosdhjkl"],
    ["Charlie", "qxweoirutywoir"],
    ["Diana", "xnvzoxwiuroplk"],
    ["Ethan", "buiwxeufhweoru"],
    ["Fiona", "zxcvxbnmasdlfk"],
    ["George", "werxtyuiodfghj"],
    ["Hannah", "qazxwsxedcrvbn"],
    ["Ian", "lkjhgxfdsaqweo"],
    ["Jane", "mnbxvcxzlkjhgf"],
    ["Kevin", "poxlkmnibvcdsa"],
    ["Laura", "bxvnmlkoiuytre"],
    ["Mike", "lkjhgfdsaxzxcv"],
    ["Nina", "rtyuiokxmnxxvcxz"],
    ["Oscar", "sdfghjklqxwepo"],
    ["Paula", "zxcasdfqxwerfd"],
    ["Quincy", "yuioqwermnbvc"],
    ["Rachel", "xcvbmnlasdfgh"],
    ["Sam", "ertyioklmnbvc"],
    ["Tina", "asdfghjklwert"],
    ["Umar", "mnvcxzlkjhxgfd"],
    ["Vera", "poilkjmnbxxvcxz"],
    ["Will", "qwertyuioxplkj"],
    ["Xena", "asdfghjkxlmnbv"],
    ["Yara", "zxcvbnmxlkqwer"],
    ["Zane", "oiuytrexwqlkjh"],
    ["Alan1", "mnbvcxxzlkjfghgf"],
    ["Betty", "asdfghxjklqwer"],
  ];
  
  let test = hashMap(names);
  
  console.log(test.entries());
  function hashMap(array) {
    let buckets = [];
    for (let i = 0; i < array.length; i++) {
      buckets[i] = new linkedList();
    }
    for (let i = 0; i < array.length; i++) {
      // let splitName = array[i].split(" ");
      set(array[i][1], array[i][0]);
      // console.log(array[i]);
    }
  
    function checkSize(){
      let bucketSize = 0;
      for(let i = 0; i < buckets.length; i++){
        if(buckets[i]){
          bucketSize++;
        }
      }
      if(bucketSize / (buckets.length - 1) >= 75){
        return true;
      }
      return false;
    }
  
    function hashCode(key) {
      if(!key){
        return;
      }
      let hashCode = 0;
      let prime = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode += i * prime + key[i].charCodeAt(0) * i;
      }
      return hashCode;
    }
  
    function set(key, value) {
      // console.log(checkSize());
      if (!get(key)) {
        buckets[hashCode(key) % buckets.length].append({
          key: key,
          value: value,
        });
        return;
      }
      let index = hashCode(key) % buckets.length;
      let node = buckets[index].head();
      if (node.value) {
        if (node.value.key === key) {
          return node.value.value;
        }
        while (node.next !== null) {
          if (node.value.key === key) {
            return node.value.value;
          }
          node = node.next;
        }
        return null;
      }
    }
  
    function get(key) {
      if(!key){
        return;
      }
      let index = hashCode(key) % buckets.length;
      let node = buckets[index].head();
      if (node.value !== null) {
        if (node.value.key === key) {
          return node.value.value;
        }
        node = node.next;
        while (node) {
          if (node.value.key === key) {
            return node.value.value;
          }
          node = node.next;
        }
        return null;
      }
    }
  
    function has(key) {
      if(!key){
        return false;
      }
      let index = hashCode(key) % buckets.length;
      let node = buckets[index].head();
      if (node.value) {
        if (node.value.key === key) {
          return true;
        }
        while (node.next !== null) {
          if (node.value.key === key) {
            return true;
          }
          node = node.next;
        }
      }
      return false;
    }
  
    function remove(key) {
      let index = hashCode(key) % buckets.length;
      if (this.has(key)) {
        buckets[index].remove(buckets[index].find(key));
        return true;
      }
      return false;
    }
  
    function length() {
      let length = 0;
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].head().value !== null) {
          length += buckets[i].size();
        }
      }
      return length;
    }
  
    function clear() {
      for (let i = 0; i < buckets.length; i++) {
        buckets[i].head().value = null;
        buckets[i].head().next = null;
      }
    }
  
    function keys() {
      let keysArray = [];
      for (let i = 0; i < buckets.length; i++) {
        let node = buckets[i].head();
        if (node.value) {
          if (node.value.key) {
            keysArray.push(node.value.key);
          }
          while (node.next !== null) {
            if (node.value.key) {
              keysArray.push(node.value.key);
            }
            node = node.next;
            if(node === null){
              keysArray.push(node.value.key);
            }
          }
        }
      }
  
      return keysArray;
    }
   
    function values() {
      let valueArray = [];
      for (let i = 0; i < buckets.length; i++) {
        let node = buckets[i].head();
        if (node.value) {
          if (node.value.key) {
            valueArray.push(node.value.value);
          }
          node = node.next;
          while (node !== null) {
            if (node.value.key) {
              valueArray.push(node.value.value);
            }
            node = node.next;
          }
        }
      }
  
      return valueArray;
    }
  
    function entries() {
      let entryArray = [];
      for (let i = 0; i < buckets.length; i++) {
        let node = buckets[i].head();
        if (node.value) {
          if (node.value.key) {
            entryArray.push([node.value.value, node.value.key]);
          }
          node = node.next;
          while (node !== null) {
            if (node.value.key) {
              entryArray.push([node.value.value, node.value.key]);
            }
            node = node.next;
          }
        }
      }
      return entryArray;
    }
  
    return {
      hashCode,
      set,
      get,
      has,
      remove,
      length,
      clear,
      keys,
      values,
      entries,
    };
  }
  