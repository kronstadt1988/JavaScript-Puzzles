
/**
 Code to solve the Skynet Finale 1 puzzle at www.codingame.com

 */

var inputs = readline().split(' ');
var N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
var L = parseInt(inputs[1]); // the number of links
var E = parseInt(inputs[2]); // the number of exit gateways
var arrayOfGateways = [];
var g = new Graph(N)


var arrayOfEdges = [];

for (var i = 0; i < L; i++) {
    var inputs = readline().split(' ');
    var N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    var N2 = parseInt(inputs[1]);
   
    arrayOfEdges.push({"n1":N1, "n2" : N2})
    g.addEdge(N1,N2);
}
for (var i = 0; i < E; i++) {
    var EI = parseInt(readline()) // the index of a gateway node
    arrayOfGateways.push({"node" :EI, "array" : []});
}

function Graph(v){
    this.vertices = v;
    this.edges = 0;
    this.redirectedEdges = 0;
    this.adj = [];
    this.edgeTo = [];
    this.marked = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.marked[i] = false;
        this.adj[i] = [];
        this.edgeTo[i] = [];
    }
    
    this.addEdge = function(v, w){
        if(this.adj[v] === undefined || this.adj[w] === undefined ){
            throw "Couldn't insert because no such node exists."
        }
        this.adj[v].push(w);
        this.adj[w].push(v);
        this.edges++;
    }

    this.removeEdge = function(v, w){
        if(this.adj[v].indexOf(w)>=0 && this.adj[w].indexOf(v)>=0){
            var indexV = this.adj[v].indexOf(w);
            var indexW = this.adj[w].indexOf(v);

            this.adj[v].splice(indexV,1);
            this.adj[w].splice(indexW,1);

            this.edges--;
        }else{
            return false;
        }
    }

    this.pathTo = function (v) {
        var distance = [];
        var pred = [];

        for(var i = 0 ; i<this.vertices ; i++){
            distance[i]=null;
            pred[i] = 0;
        }

        var self = this;
        var queue = [];
        this.marked[v] = true;
        queue.push(v); // add to back of queue
        while (queue.length > 0) {
            var v = queue.shift(); // remove from front of queue

            this.adj[v].forEach(function(w){
                if (!self.marked[w]) {
                    self.marked[w] = true;
                    distance[w]=distance[v]+1
                    pred[w] = v
                    queue.push(w);
                    
                }

            })
        }
        return{
            distance : distance,
            pred : pred
        }  
    }
    
}

arrayOfGateways.forEach(function(item,index){
        item.array = g.pathTo(item.node)
        for(var i = 0 ; i<g.marked.length; i++){
            g.marked[i]=false;
        }
    })

// game loop
while (true) {
    var printed = false;
    var SI = parseInt(readline());
    for(var i = 0; i<g.marked.length; i++){
        g.marked[i]=false
    }
    for(var i = 0 ; i<arrayOfGateways.length; i++){
        arrayOfGateways[i].array.distance
        if(arrayOfGateways[i].array.distance[SI]===1){
            print(arrayOfGateways[i].node +" " +SI);
            printed=true;
        }
    }
    if(!printed){
        print(arrayOfEdges[0].n1 + " " + arrayOfEdges[0].n2)
        arrayOfEdges.shift();
    }
    
    
        
}
