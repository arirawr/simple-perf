// Ari Vaniderstine, 2017
// github.com/arirawr/simple-perf

function runPerfTest(fun, repeat) {
    var t0 = performance.now();
    if(repeat>1) {
        for(var i = 1; i<=repeat; i++) { 
            fun();
        }
    }
    else {
        fun();
    }
    var t1 = performance.now();
    console.log("Call to " + fun.name + " took " + (t1 - t0) + " milliseconds.");
    return t1 - t0;
}

function getPerfDifference(fun1, fun2, repeat) {
    var time1 = runPerfTest(fun1, repeat);
    var time2 = runPerfTest(fun2, repeat);
    var diff;

    if(time1 > time2) {
        diff = time1/time2;
        console.log(fun2.name + " is " + diff + " times faster than " + fun1.name)
        return diff * -1;
    }
    if(time2 > time1) {
        diff = time2/time1;
        console.log(fun1.name + " is " + diff + " times faster than " + fun2.name)
        return diff;
    }

    return diff;
}

function repeatPerf(fun1, fun2, repeat) {
    var wins1 = 0;
    var wins2 = 0;

    for(var i = 1; i<=repeat; i++) { 
        var diff = getPerfDifference(fun1, fun2, 1);

        if(diff > 0) {
            wins1++;
        }
        if(diff < 0) {
            wins2++;
        }
    }

    if(wins1 > wins2) {
        percent = (wins1/repeat)*100;
        console.warn(fun1.name + " is faster than " + fun2.name + " " + percent + " percent of the time.");
    }

    if(wins2 > wins1) {
        percent = (wins2/repeat)*100;
        console.warn(fun2.name + " is faster than " + fun1.name + " " + percent + " percent of the time.");
    }

    return percent;
}