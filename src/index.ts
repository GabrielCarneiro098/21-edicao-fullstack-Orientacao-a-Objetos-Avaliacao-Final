import { User } from "./models/User";
import { Tweet } from "./models/Tweet";
import { Tweets } from "./database/Tweets";
import { Users } from "./database/Users";

//Criando istâncias
const gabrielUser = new User(
  "Gabriel Carneiro",
  "GabrielDev",
  "gabriel@teste",
  "Senha1234@"
);
const ciclanoUser = new User(
  "Ciclano Pereira",
  "Ciclando",
  "ciclano@teste",
  "Senha1234@"
);
const fulanoUser = new User("Fulano", "Fulanin", "fulano@teste", "Senha1234@");

// Registrando usuários
gabrielUser.registerUser();
ciclanoUser.registerUser();
fulanoUser.registerUser();

// Criando instâncias de tweets
const tweet0 = new Tweet(
  "Rosas são vermelhas, violetas são azuis...",
  "normal"
);
const tweet1 = new Tweet(
  "Não gosto muito de calor e nem de frio. 0° pra mim ta perfeito",
  "normal"
);
const tweet2 = new Tweet(
  "Só preciso de um dinheiro pra comprar um mé. O leitin das criança e o Modess da muié",
  "normal"
);

// Criando instâncias de replies
const reply0 = new Tweet("Nice thoughts!", "reply");
const reply1 = new Tweet("Thanks!", "reply");
const reply2 = new Tweet("Sabe muito!!", "reply");

// Testes
tweet0.sendTweet(gabrielUser);
tweet1.sendTweet(fulanoUser);
tweet2.sendTweet(ciclanoUser);
reply0.reply(tweet0, ciclanoUser);
reply1.reply(tweet0, gabrielUser);
reply2.reply(tweet0, fulanoUser);
tweet0.like(fulanoUser);
tweet0.like(ciclanoUser);
tweet0.like(gabrielUser);

tweet2.like(fulanoUser);
tweet2.like(ciclanoUser);

gabrielUser.follow(fulanoUser);
gabrielUser.follow(ciclanoUser);
fulanoUser.follow(gabrielUser);
fulanoUser.showFollowers();
ciclanoUser.follow(fulanoUser);
fulanoUser.showFollowers();

tweet0.show();
tweet1.show();
tweet2.show();
fulanoUser.showFollowers();

gabrielUser.showFeed();
fulanoUser.showFeed();
