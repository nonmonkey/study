/**
  中介者模式的作用就是解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的 相关对象都通过中介者对象来通信，
  而不是互相引用，所以当一个对象发生改变时，只需要通知中介者对象即可。中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互。
  中介者模式使网状的多对多关系变成了相对简单的一对多关系
 */

/* 泡泡堂游戏 start */
{
  let players = [];

  let Player = function (name, teamColor) {
    this.name = name;
    this.teamColor = teamColor; // 队伍颜色
    this.partners = []; // 队友列表
    this.enemies = []; // 敌人
    this.state = 'live'; // 玩家状态
  };

  Player.prototype.win = function () {
    console.log(this.name + ' won!');
  };

  Player.prototype.lose = function () {
    console.log(this.name + ' lost');
  };

  Player.prototype.die = function () {
    let all_dead = true;
    this.state = 'dead'; // 设置玩家状态为死亡

    for (let i = 0, l = this.partners.length; i < l; i++) {
      // 如果还有一个队友没有死亡，则游戏还未失败
      if (this.partners[i].state !== 'dead') {
        all_dead = false;
        break;
      }
    }

    // 如果队友全部死亡
    if (all_dead === true) {
      this.lose(); // 通知自己游戏失败
      for (let i = 0, l = this.partners.length; i < l; i++) {
        this.partners[i].lose();
      }
      for (let j = 0, l = this.enemies.length; j < l; j++) {
        this.enemies[j].win();
      }
    }
  };

  let playerFactory = function (name, teamColor) {
    let newPlayer = new Player(name, teamColor);

    for (let i = 0, player; (player = players[i++]); ) {
      if (player.teamColor === newPlayer.teamColor) {
        // 同一队玩家
        player.partners.push(newPlayer); // 相互添加到队友列表
        newPlayer.partners.push(player);
      } else {
        player.enemies.push(newPlayer);
        newPlayer.enemies.push(player);
      }
    }
    players.push(newPlayer);
    return newPlayer;
  };

  let text = function () {
    // 红队
    let player1 = playerFactory('name1', 'red');
    let player2 = playerFactory('name2', 'red');
    let player3 = playerFactory('name3', 'red');
    let player4 = playerFactory('name4', 'red');
    // 蓝队
    let player5 = playerFactory('name5', 'blue');
    let player6 = playerFactory('name6', 'blue');
    let player7 = playerFactory('name7', 'blue');
    let player8 = playerFactory('name8', 'blue');

    player1.die();
    player2.die();
    player4.die();
    player3.die();
  };

  // text();
}
/* 泡泡堂游戏 end */

/* 中介者模式改造 泡泡糖游戏 start */
{
  let Player = function (name, teamColor) {
    this.name = name;
    this.teamColor = teamColor;
    this.state = 'alive'; // 玩家状态
  };

  Player.prototype.win = function () {
    console.log(this.name + ' won!');
  };

  Player.prototype.lose = function () {
    console.log(this.name + ' lost');
  };

  Player.prototype.die = function () {
    this.state = 'dead';
    playerDirector.reciveMessage('playerDead', this); // 给中介者发送消息，玩家死亡
  };

  Player.prototype.remove = function () {
    playerDirector.reciveMessage('removePlayer', this); // 给中介者发送消息，移除一个玩家
  };

  Player.prototype.changeTeam = function (color) {
    playerDirector.reciveMessage('changeTeam', this, color); // 给中介者发消息，新增玩家
  };

  let playerFactory = function (name, teamColor) {
    let newPlayer = new Player(name, teamColor);
    playerDirector.reciveMessage('addPlayer', newPlayer);
    return newPlayer;
  };

  // 利用发布—订阅模式。将 playerDirector 实现为订阅者，各 player 作为发布者，一旦 player 的状态发生改变，便推送消息给 playerDirector，playerDirector 处理消息后将反馈发送给其他 player。
  // 在 playerDirector 中开放一些接收消息的接口，各 player 可以直接调用该接口来给 playerDirector 发送消息，player 只需传递一个参数给 playerDirector，这个参数的目的 是使 playerDirector 可以识别发送者。同样，playerDirector 接收到消息之后会将处理结果反馈给其他 player。
  let playerDirector = (function () {
    let players = {}; // 保存所有玩家
    let operations = {}; // 中介者可以执行的操作

    // 新增一个玩家
    operations.addPlayer = function (player) {
      let teamColor = player.teamColor; // 玩家的队伍颜色
      players[teamColor] = players[teamColor] || []; // 如果该颜色玩家还没有成立队伍，则新成立一个队伍
      players[teamColor].push(player); // 添加玩家
    };

    operations.removePlayer = function (player) {
      let teamColor = player.teamColor; // 玩家颜色
      let teamPlayers = players[teamColor] || []; // 该队伍所有成员

      // 遍历删除
      for (let i = teamPlayers.length - 1; i >= 0; i--) {
        if (teamPlayers[i] === player) teamPlayers.splice(i, 1);
      }
    };

    // 玩家换队
    operations.changeTeam = function (player, newTeamColor) {
      operations.removePlayer(player); // 原队伍删除
      player.teamColor = newTeamColor; // 改变队伍颜色
      operations.addPlayer(player);
    };

    operations.playerDead = function (player) {
      let teamColor = player.teamColor;
      let teamPlayers = players[teamColor];
      let all_dead = true;
      let l = teamPlayers.length;

      for (let i = 0; i < l; i++) {
        if (teamPlayers[i].state !== 'dead') {
          all_dead = false;
          break;
        }
      }

      if (all_dead === true) {
        // 本队所有玩家
        for (let i = 0; i < l; i++) {
          teamPlayers[i].lose(); // 本队所有玩家lose
        }
        for (let color in players) {
          if (color !== teamColor) {
            let enemyPlayers = players[color]; // 其它队伍玩家
            for (let j = 0, enemyLen = enemyPlayers.length; j < enemyLen; j++) {
              enemyPlayers[j].win();
            }
          }
        }
      }
    };

    let reciveMessage = function () {
      let message = Array.prototype.shift.call(arguments); // arguments 第一个参数为消息名称
      operations[message].apply(this, arguments);
    };

    return {
      reciveMessage,
    };
  })();

  // 红队
  let player1 = playerFactory('name1', 'red');
  let player2 = playerFactory('name2', 'red');
  let player3 = playerFactory('name3', 'red');
  let player4 = playerFactory('name4', 'red');
  // 蓝队
  let player5 = playerFactory('name5', 'blue');
  let player6 = playerFactory('name6', 'blue');
  let player7 = playerFactory('name7', 'blue');
  let player8 = playerFactory('name8', 'blue');

  let text1 = function () {
    player1.die();
    player2.die();
    player3.die();
    player4.die();
  };

  let text2 = function () {
    player1.remove();
    player2.remove();
    player3.die();
    player4.die();
  };

  let text3 = function () {
    player1.changeTeam('blue');
    player2.die();
    player3.die();
    player4.die();
  };

  // text3();
}
/* 中介者模式改造 泡泡糖游戏 end */
