class Graph {
  constructor() {}

  #vertices = []; // 所有顶点的名字

  #adjList = new Dictionary(); // 用一个字典来储存邻接表。字典将会使用顶点的名字作为键，邻接顶点列表作为值

  // 添加顶点
  addVertex(v) {
    this.#vertices.push(v);
    this.#adjList.set(v, []);
  }

  // 添加顶点之间的边
  addEdge(v, w) {
    this.#adjList.get(v).push(w);
    this.#adjList.get(w).push(v);
  }

  toString() {
    let s = '';
    for (let i = 0; i < this.#vertices.length; i++) {
      s += this.#vertices[i] + ' -> ';
      let neighbors = this.#adjList.get(this.#vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ' ';
      }
      s += '\n';
    }
    return s;
  }

  // 广度优先搜索和深度优先搜索都需要标注被访问过的顶点
  // 由于当算法开始执行时，所有的顶点颜色都是白色
  initializeColor() {
    let color = {};
    for (let i = 0; i < this.#vertices.length; i++) {
      color[this.#vertices[i]] = 'white';
    }
    return color;
  }

  // 广度优先搜索：从指定的第一个顶点开始遍历图，先访问其所有的相邻点(先宽后深地访问顶点)
  bfs(v, callback) {
    // 广度优先搜索和深度优先搜索都需要标注被访问过的顶点。
    // 为此，我们将使用一个辅助数组 color。由于当算法开始执行时，所有的顶点颜色都是白色
    let color = this.initializeColor();
    let queue = new Queue();
    queue.enqueue(v);

    while (!queue.isEmpty()) {
      let u = queue.dequeue().element;
      let neighbors = this.#adjList.get(u);
      color[u] = 'grey';
      for (let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i];
        if (color[w] === 'white') {
          color[w] = 'grey';
          queue.enqueue(w);
        }
      }
      color[u] = 'black';
      if (callback) {
        callback(u, color);
      }
    }
  }

  // bfs改进
  BFS(v) {
    // 源顶点v，找出对每个顶点u，u和v之间最短路径的距离(以边的数量计)。
    let color = this.initializeColor();
    let queue = new Queue();
    let d = {}; // 从v到u的距离d[u];
    let pred = {}; // 前溯点pred[u]，用来推导出从v到其他每个顶点u的最短路径。

    queue.enqueue(v);
    for (let i = 0; i < this.#vertices.length; i++) {
      d[this.#vertices[i]] = 0;
      pred[this.#vertices[i]] = null;
    }

    while (!queue.isEmpty()) {
      let u = queue.dequeue().element;
      let neighbors = this.#adjList.get(u);
      console.log(u + '-neighbors:', JSON.stringify(neighbors));
      color[u] = 'grey';

      for (let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i];
        if (color[w] === 'white') {
          color[w] = 'grey';
          d[w] = d[u] + 1;
          pred[w] = u;
          queue.enqueue(w);
        }
      }
      color[u] = 'black';
    }
    return {
      distances: d,
      predecessors: pred,
    };
  }

  // BFS 最短路径
  BFSShortestPath(fromVertex) {
    let shortestPathA = this.BFS(fromVertex);

    for (let i = 1; i < this.#vertices.length; i++) {
      let toVertex = this.#vertices[i];
      let path = new Stack();

      for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
        path.push(v);
      }

      path.push(fromVertex);
      let s = path.pop();

      while (!path.isEmpty()) {
        s += ' - ' + path.pop();
      }
      console.log(s);
    }
  }

  // 深度优先算法
  dfs(callback) {
    let color = this.initializeColor();

    for (let i = 0; i < this.#vertices.length; i++) {
      if (color[this.#vertices[i]] === 'white') {
        this._dfsVisit(this.#vertices[i], color, callback);
      }
    }
  }

  _dfsVisit(u, color, callback) {
    color[u] = 'grey';
    if (callback) {
      callback(u);
    }

    let neighbors = this.#adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (color[w] === 'white') {
        this._dfsVisit(w, color, callback);
      }
    }
    color[u] = 'black';
  }

  // dfs改进
  time = 0;

  DFS() {
    let color = this.initializeColor();
    // 顶点u的发现时间d;
    // 当顶点u被标注为黑色时，u的完成探索时间f;
    // 顶点u的前溯点p。
    let d = {};
    let f = {};
    let p = {};

    for (let i = 0; i < this.#vertices.length; i++) {
      d[this.#vertices[i]] = 0;
      f[this.#vertices[i]] = 0;
      p[this.#vertices[i]] = null;
    }

    for (let i = 0; i < this.#vertices.length; i++) {
      if (color[this.#vertices[i]] === 'white') {
        this._DFSVisit(this.#vertices[i], color, d, f, p);
      }
    }

    return {
      discovery: d,
      finished: f,
      predecessors: p,
    };
  }

  _DFSVisit(u, color, d, f, p) {
    color[u] = 'grey';
    d[u] = ++this.time;
    let neighbors = this.#adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (color[w] === 'white') {
        p[w] = u;
        this._DFSVisit(w, color, d, f, p);
      }
    }

    color[u] = 'black';
    f[u] = ++this.time;
  }

  // 使用深度优先搜索来实现拓扑排序, 拓扑排序只能应用于DAG
}
