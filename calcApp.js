function calc__func()
{
    var inputPrev__CryptoEx = Number(document.getElementById('inputprev__cryptoex').value);
    var inputToday__CryptoEx = Number(document.getElementById('inputtoday__cryptoex').value);
    var inputPrev__Curr_Amnt = Number(document.getElementById('inputprev__curr_amnt').value);
    var inputToday__Curr_Amnt = Number(document.getElementById('inputtoday__curr_amnt').value);

    var prevBitValue = inputPrev__Curr_Amnt/inputPrev__CryptoEx;
        console.log(prevBitValue);

    var currentBitValue = inputToday__Curr_Amnt/inputToday__CryptoEx;
        console.log(currentBitValue);

    var gain_LossCrypto = prevBitValue-currentBitValue;
    console.log(gain_LossCrypto);

    var gain_LossCurrUS = inputToday__CryptoEx*(prevBitValue - currentBitValue);
        console.log(gain_LossCurrUS);

    var totalWalletCurrUS = gain_LossCurrUS + inputPrev__Curr_Amnt;
        console.log(totalWalletCurrUS);

    document.getElementById('calcResult').value = totalWalletCurrUS;

}

var budgetController = (function () 
{
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
        Expense.prototype.calcPercentage = function(totalIncome){

            if(totalIncome > 0){
                this.percentage = Math.round( (this.value / totalIncome) * 100 );
            }else{
                this.percentage = -1;
            }

        };

        Expense.prototype.getPercentage = function(){
            return this.percentage
        };

        var Income = function (id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        };

        var calculateTotal = function (type) {
            var sum = 0;
            data.allItems[type].forEach(function (current) {
                sum += current.value;
            });
            data.total[type] = sum;
        };

        var fetchLocalData = function(localData){
            
            // Process all expense entries
            data.allItems.crypto_val = localData.allItems.crypto_val.map((expense)=>{
                let crypto_val = new Expense(expense.id, expense.description, expense.value);
                crypto_val.calcPercentage(localData.total.btc_val);
                return crypto_val;
            });

            // Process all income entries
            data.allItems.btc_val = localData.allItems.btc_val.map(income => new Income(income.id, income.description, income.value));
            // data.allItems.btc_val = localData.allItems.btc_val.map(income => new Income(income.id, income.description, income.value));
            // data.allItems.btc_val = localData.allItems.btc_val.map(income => new Income(income.id, income.description, income.value));
            // data.allItems.btc_val = localData.allItems.btc_val.map(income => new Income(income.id, income.description, income.value));

            // Calculate total income and expenses
            calculateTotal('btc_val');
            calculateTotal('crypto_val');

            // Calculate the budget : income - expense
            data.budget = data.total.btc_val - data.total.crypto_val;

            // Calculate the percentage of income that we spent
            if (data.total.btc_val > 0)
                data.percentage = Math.round((data.total.crypto_val / data.total.btc_val) * 100);
            else
                data.percentage = -1;

            return data;
        }
        
        var updateLocalDataObj = function (){
            let localString = JSON.stringify(data)
            localStorage.setItem("localBudget",localString);
            
        };

        var data = {
            allItems: {
                crypto_val: [],
                btc_val: [],
            },
            total: {
                crypto_val: 0,
                btc_val: 0,
            },

            budget: 0,

            percentage: 0

        };

        
        return {
            


            preFetchData: function(data){
                return fetchLocalData(data);
            },
            clearLocalData: function(){
                localStorage.clear();
                window.location.reload();
            },
            addItem: function (type, des, val) {
                var newItem, ID;

                // ID = Last id + 1
                // Create new ID
                if (data.allItems[type].length > 0) {
                    ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                } else {
                    ID = 0;
                }

                // Create new item based on 'btc_val' or 'crypto_val' type
                if (type === "crypto_val") {
                    newItem = new Expense(ID, des, val);
                } else if (type === "btc_val") {
                    newItem = new Income(ID, des, val);
                }

                // Push it into our data structure
                data.allItems[type].push(newItem);

                // Updating Locally stored data on every operation
                updateLocalDataObj();

                // Return the new element
                return newItem;
            },

            deleteItem: function(type, id){
                var ids, index;

                ids = data.allItems[type].map(function(current){
                    return current.id;
                });

                index = ids.indexOf(id);

                if (index !== -1){
                    data.allItems[type].splice(index,1);
                }
                
                // Updating Locally stored data on every operation
                updateLocalDataObj();
            },

            calculateBudget: function () {

                // Calculate total income and expenses
                calculateTotal('btc_val');
                calculateTotal('crypto_val');

                // Calculate the budget : income - expense
                data.budget = data.total.btc_val - data.total.crypto_val;

                // Calculate the percentage of income that we spent

                if (data.total.btc_val > 0) {
                    data.percentage = Math.round((data.total.crypto_val / data.total.btc_val) * 100);
                } else {
                    data.percentage = -1;
                }

                // Updating Locally stored data on every operation
                updateLocalDataObj();
            },

            calculatePercentage: function(){
                data.allItems.crypto_val.forEach(function(cur){
                    cur.calcPercentage(data.total.btc_val);
                });
                // Updating Locally stored data on every operation
                updateLocalDataObj();
            },

            getPercentages: function(){
                var allPerc = data.allItems.crypto_val.map(function(cur){
                    return cur.getPercentage();
                });

                return allPerc;
            },

            getBudget: function () {
                return {
                    budget: data.budget,
                    percentage: data.percentage,
                    totalInc: data.total.btc_val,
                    totalExp: data.total.crypto_val
                };
            },

            testing: function () {
                console.log(data);
            },
        };
    })();

    var UIController = (function () {
            var DOMstrings = {
            crypto__Type: ".crypto__type__class",
        // currency__Type: ".currency__type__class",
            inputprev__CryptoEx: ".inputprev__cryptoex",
            inputprev__Curr_Amnt: ".inputprev__curr_amnt",
            inputtoday__CryptoEx: ".inputtoday__cryptoex",
            inputtoday__Curr_Amnt: ".inputtoday__curr_amnt",
        // inputValue: ".add__value",
            calc__Btn: ".calc__btn",
            prev__cryptoex_Container: 'prev__cryptoex_input', 	//<---incomeContainer: ".income__list",
            today__cryptoex_Container: 'today__cryptoex_input', 	//<---expenseContainer: ".expenses__list"
            prev__curr_amnt_Container: 'prev__curr_amnt_input',
            today__curr_amnt_Container: 'today__curr_amnt_input',
            walletTotalLabel: '.cryptoWalletTotal__value',
            gain_LossLabel: '.gain_Loss--value',
            profit_LossLabel: '.profit_Loss--value',
            percentageLabel: '.profit_Loss--percentage',
            container: '.container',
            expensePercLabel: '.item__percentage',
            dateLabel: '.cryptoResult__title--month'
        };

        var formatNumber = function(num, type){
            var numSplit,int,dec;

            num = Math.abs(num);
            num = num.toFixed(2);

            numSplit = num.split('.');

            // Add commas to numbers recursively
            function addComma(integer) {

                if (integer.length <= 3) {
                    return integer;
                } else {
                    return addComma(integer.substring(0, integer.length - 3))+ ',' + integer.substr(integer.length - 3, integer.length); // input -> 23510, output -> 23,510
                }

            }

            // if(int.length > 3){
            //     int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            // }

            int = addComma(numSplit[0]);

            dec = numSplit[1];

            return (type === 'btc_val' ? "+ " : "- ") + int + '.' + dec;

        };

        var nodeListForEach = function(list, callback){

            for( var i = 0; i<list.length; i++){
                callback(list[i], i);
            }

        };

        return {

            // getInput: function () {
            //     return {
            //         type: document.querySelector(DOMstrings.crypto__Type).value, // We will get btc_val or crypto_val
            //         description: document.querySelector(DOMstrings.inputprev__CryptoEx).value,
            //         value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            //     };
            // },

            // addListItem: function (obj, type) {
            //     var html, newHtml, element;

            //     // Create HTML string with placeholder text

            //     if (type === "btc_val") {
            //         element = DOMstrings.incomeContainer;

            //         html = '<div class="item clearfix" id="btc_val-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            //     } else if (type === "crypto_val") {
            //         element = DOMstrings.expenseContainer;

            //         html = '<div class="item clearfix" id="crypto_val-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            //     }

            //     // Replace the placeholder string with some actual data

            //     newHtml = html.replace('%id%', obj.id);
            //     newHtml = newHtml.replace('%description%', obj.description);
            //     newHtml = newHtml.replace('%value%',formatNumber(obj.value, type));

            //     // Insert the HTML into the DOM
            //     document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

            // },

            // deleteListItem: function(selectorID){

            //     var el = document.getElementById(selectorID);

            //     el.parentNode.removeChild(el);

            // },

            clearFields: function () {
                var fields, fieldsArr;

                fields = document.querySelectorAll(DOMstrings.inputprev__CryptoEx + ', ' + DOMstrings.inputValue);

                fieldsArr = Array.prototype.slice.call(fields);

                fieldsArr.forEach(function (current, index, array) {
                    current.value = "";
                });

                fieldsArr[0].focus();

            },


            display_cryptoResult: function(obj){


                var type;
                obj.budget >= 0 ? type = 'btc_val' : type = 'crypto_val';

                // document.getElementById('calcResult').value = totalWalletCurrUS;

                // document.querySelector(DOMstrings.walletTotalLabel).textContent = formatNumber(obj.budget, type);
                // document.querySelector(DOMstrings.gain_LossLabel).textContent = formatNumber(obj.totalInc, 'btc_val');
                // document.querySelector(DOMstrings.profit_LossLabel).textContent = formatNumber(obj.totalExp, 'crypto_val');
                if(obj.percentage > 0){
                    document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%" ;
                }
                // else{
                //     document.querySelector(DOMstrings.percentageLabel).textContent = "---";
                // }
                
            },

            displayPercentages: function(percentage){

                var fields = document.querySelectorAll(DOMstrings.expensePercLabel);

                nodeListForEach(fields, function(current, index){

                    if(percentage[index] > 0){
                        current.textContent = percentage[index] + "%";
                    }else{
                        current.textContent = "---";
                    }
                });

            },

            displayMonth: function(){
                var now, month, months, year;

                now = new Date();

                month = now.getMonth();

                year = now.getUTCFullYear();

                months = ['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];

                document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;

            },

            changeType: function(){

                var fields = document.querySelectorAll(
                    DOMstrings.crypto__Type + ',' + 
                    DOMstrings.inputprev__CryptoEx + ',' + 
                    DOMstrings.inputValue);

                nodeListForEach(fields, function(cur){
                    cur.classList.toggle("red-focus");
                });

                document.querySelector(DOMstrings.calc__Btn).classList.toggle('red');


            },

            getDOMstrings: function () {
                return DOMstrings;
            },
            
            prepareUI: function(data){

                // Process all expense entries and their percentages
                let percentages = [];
                data.allItems.crypto_val.forEach( expense => {
                    percentages.push(expense.percentage);
                    this.addListItem(expense, "crypto_val");
                });
                this.displayPercentages(percentages);
        
                // Process all income entries
                data.allItems.btc_val.forEach( income => UIController.addListItem(income, "btc_val") );
                
                // Display budget
                this.display_cryptoResult({
                    budget: data.budget,
                    percentage: data.percentage,
                    totalInc: data.total.btc_val,
                    totalExp: data.total.crypto_val
                });
            }
        };
    })();

    var Controller = (function (budgetCtrl, UICtrl) {
        var setupEventListeners = function () {
            var DOM = UICtrl.getDOMstrings();

            // document.querySelector(DOM.calc__Btn).addEventListener("click", ctrlAddItem);

            document.addEventListener("keypress", function (event) {
                if (event.keyCode === 13 || event.which === 13) {
                    // ctrlAddItem();
                }
            });

            document.querySelector(DOM.container).addEventListener("click",ctrlDeleteItem);

            document.querySelector(DOM.crypto__Type).addEventListener('change', UICtrl.changeType);
        };

        var updateBudget = function () {

            // 1. Calculate the budget
            budgetCtrl.calculateBudget();

            // 2. Return the budget
            var budget = budgetCtrl.getBudget();
            
            // 3. Update the UI
            UICtrl.display_cryptoResult(budget);
        };

        var updatePercentages = function(){
            
            // 1. Calculate the percentages
            budgetCtrl.calculatePercentage();

            // 2. Read the percentages from the budget controller
            var percentage = budgetCtrl.getPercentages();

            // 3. Update the UI
            UICtrl.displayPercentages(percentage);


        }

        // var ctrlAddItem = function () {
        //     var input, newItem;

        //     // 1. Get input values
        //     // input = UICtrl.getInput();

        //     if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

        //         // 2. Add new item to our data structure
        //         newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        //         // 3. Add new item to UI
        //         UICtrl.addListItem(newItem, input.type);

        //         // 4. Clear Input Fields 
        //         UICtrl.clearFields();

        //         // 5. Calculate and Update budget
        //         updateBudget();

        //         // 6. Calculate and update Percentages
        //         updatePercentages();

        //     }

        // };

        var ctrlDeleteItem = function(event){
            var itemID, splitID, type, ID;

            itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

            if(itemID){
                splitID = itemID.split('-');
                type = splitID[0];
                ID = parseInt(splitID[1]);

                // 1. Delete item from data structure
                budgetCtrl.deleteItem(type, ID);

                // 2. Delete item from the UI
                UICtrl.deleteListItem(itemID);

                // 3. Update and show the new budget
                updateBudget();

                // 4. Calculate and update Percentages
                updatePercentages();
            }
        }

        return {
            init: function () {
                console.log("Application has been started");
                UICtrl.display_cryptoResult({
                    budget: 0,
                    percentage: -1,
                    totalInc: 0,
                    totalExp: 0
                });
                UICtrl.displayMonth();
                setupEventListeners();

                // Fetch previous data
                let localStorageString = localStorage.getItem("localBudget");
                if(localStorageString){
                    let localData = JSON.parse(localStorageString);
                    let preparedData = budgetCtrl.preFetchData(localData);
                    UICtrl.prepareUI(preparedData);
                    console.log("Locally stored data:",localData);
                }else
                    console.log("Couldn't find any local data !");
            
            },
        };
    })(budgetController, UIController);

    Controller.init();


    function clearEverything(){
        if(confirm("This will clear all the data on this page permanently\n Are you sure?"))
            budgetController.clearLocalData();
}