--
-- PostgreSQL database dump
--

-- Dumped from database version 10.1
-- Dumped by pg_dump version 10.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE bookmarks (
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp without time zone
);


ALTER TABLE bookmarks OWNER TO postgres;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    content text,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- Name: follows; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE follows (
    user_id integer NOT NULL,
    follow_id integer NOT NULL,
    created_at timestamp without time zone
);


ALTER TABLE follows OWNER TO postgres;

--
-- Name: letters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE letters (
    id integer NOT NULL,
    from_user integer NOT NULL,
    to_user integer NOT NULL,
    created_at timestamp without time zone,
    read_at timestamp without time zone,
    content text NOT NULL
);


ALTER TABLE letters OWNER TO postgres;

--
-- Name: letters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE letters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE letters_id_seq OWNER TO postgres;

--
-- Name: letters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE letters_id_seq OWNED BY letters.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE likes (
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone
);


ALTER TABLE likes OWNER TO postgres;

--
-- Name: notices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE notices (
    id integer NOT NULL,
    content text NOT NULL,
    type integer NOT NULL,
    created_at timestamp without time zone,
    readed_at timestamp without time zone
);


ALTER TABLE notices OWNER TO postgres;

--
-- Name: notices_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE notices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE notices_id_seq OWNER TO postgres;

--
-- Name: notices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE notices_id_seq OWNED BY notices.id;


--
-- Name: post_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE post_tag (
    post_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE post_tag OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE posts (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone,
    views integer DEFAULT 0,
    comments integer DEFAULT 0,
    bookmarks integer DEFAULT 0,
    likes integer DEFAULT 0,
    user_id integer NOT NULL,
    last_comment_id integer DEFAULT 0 NOT NULL
);


ALTER TABLE posts OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE posts_id_seq OWNER TO postgres;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE posts_id_seq OWNED BY posts.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE tags (
    id integer NOT NULL,
    name character varying(20),
    created_at timestamp without time zone,
    weight integer DEFAULT 0
);


ALTER TABLE tags OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tags_id_seq OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE tags_id_seq OWNED BY tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE users (
    id integer NOT NULL,
    username character varying(60) NOT NULL,
    email character varying(120) NOT NULL,
    password character varying(60) NOT NULL,
    avatar character varying(255) NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    age integer DEFAULT 0 NOT NULL,
    gender integer DEFAULT 0 NOT NULL,
    phone character varying(14) DEFAULT ''::character varying NOT NULL,
    address character varying(200) DEFAULT ''::character varying NOT NULL,
    sign character varying(200) DEFAULT ''::character varying NOT NULL,
    fans integer DEFAULT 0,
    banner character varying(255) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: letters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY letters ALTER COLUMN id SET DEFAULT nextval('letters_id_seq'::regclass);


--
-- Name: notices id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notices ALTER COLUMN id SET DEFAULT nextval('notices_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY posts ALTER COLUMN id SET DEFAULT nextval('posts_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tags ALTER COLUMN id SET DEFAULT nextval('tags_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY bookmarks (user_id, post_id, created_at) FROM stdin;
1	5	2017-12-05 18:43:42
2	9	2018-02-09 15:23:12
2	12	2018-02-12 14:33:38
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY comments (id, user_id, post_id, content, created_at, deleted_at) FROM stdin;
3	1	3	hello	\N	\N
4	1	5	good	2017-12-08 12:22:20	\N
5	2	8	上天会给我认同和认同	2018-01-23 15:01:56	\N
6	2	8	当然很多人讨厌	2018-01-23 15:02:49	\N
7	2	8	那天时间过得很快，没过多久，我就闻到了饭菜味，筒子楼里的老人们、妇女们开始做饭了。我知道离小伙伴放学的时间不远了，便隔着窗户的铁栏杆向外张望。没过多久，“肝炎病、肝炎病”的就声音传了过来，他们一边冲着荒草地喊，一边往家里走，后来见里面没人，就停了下来，望着荒草发呆。	2018-01-23 15:17:22	\N
8	2	8	“不要碰，会得肝炎病的！”拉门动作立刻停了下来，“作死的你们，怎么给你们说的？！还不快回来吃饭！”远处的老人把孩子们催了回去。	2018-01-23 15:20:59	\N
9	2	8	这样的生活持续了大半年，“肝炎病”这词渐渐淡出了小伙伴的言语中，他们不再怕我，我反而成了他们偶尔关心的对象：“你不用上学么？”“你中午吃什么？”“你会不会死？”……后来，父亲还给我买了校服、红领巾和书包，还找木匠打了个小黑板放在家里。	2018-01-23 15:21:44	\N
10	2	9	erhgreth	2018-02-09 10:49:56	\N
\.


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY follows (user_id, follow_id, created_at) FROM stdin;
\.


--
-- Data for Name: letters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY letters (id, from_user, to_user, created_at, read_at, content) FROM stdin;
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY likes (post_id, user_id, created_at) FROM stdin;
9	2	2018-02-09 15:23:19
8	2	2018-02-09 15:45:09
12	2	2018-02-12 18:28:36
12	3	2018-02-13 19:11:20
\.


--
-- Data for Name: notices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY notices (id, content, type, created_at, readed_at) FROM stdin;
\.


--
-- Data for Name: post_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY post_tag (post_id, tag_id) FROM stdin;
10	2
11	3
12	3
13	6
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY posts (id, title, content, created_at, updated_at, deleted_at, views, comments, bookmarks, likes, user_id, last_comment_id) FROM stdin;
5	test	nihao	2017-11-30 18:22:15	2017-11-30 18:22:15	\N	0	0	1	0	1	4
6	test	nihao	2017-11-30 18:22:22	2017-11-30 18:22:22	\N	0	0	0	0	1	0
4	hi	nihao	2017-11-30 16:43:58	2017-11-30 16:43:58	2017-11-30 16:58:00	0	0	0	0	1	0
3	hello	test	2017-11-29 19:18:57	2017-11-29 19:18:57	2017-11-29 19:18:57	0	0	0	0	1	0
8	他们叫我“肝炎病”	{"ops":[{"insert":"有天晚上，房东带了一包蛋糕和一包红糖，来我家看望我。房东是个退休干部，安慰我爸妈，“阳转阴就好了，平时生活注意点儿，和正常孩子一样。”当晚，房东把我父亲约出去，谈了许久。\\n第二天起床，母亲没像往常一样给我穿衣服，而是坐在床边，眼眶通红，开始抽泣。父亲一边给我穿衣穿鞋，一边告诫我：“你以后就在家里玩，不要出去了，爸妈怕外面的人欺负你。”接着，父母在门外争吵起来，母亲大骂父亲，还打了他，门外的鞋架也倒了。\\n就这样，门锁了，我开始了不能出门的“新生活”。自己朗读课文，自己给自己出数学题，然后自己解答，自己给自己打100分。\\n那天时间过得很快，没过多久，我就闻到了饭菜味，筒子楼里的老人们、妇女们开始做饭了。我知道离小伙伴放学的时间不远了，便隔着窗户的铁栏杆向外张望。没过多久，“肝炎病、肝炎病”的就声音传了过来，他们一边冲着荒草地喊，一边往家里走，后来见里面没人，就停了下来，望着荒草发呆。\\n“我在这儿，我在这儿！”我透过铁栏推开窗，向他们招手。他们扭过头看到了我，又开始喊起来：“‘肝炎病’在楼上，快跑，快跑。”然后冲上了楼。\\n他们跑得很快，伴着“咚咚咚”的脚步声，冲到我家门口停了下来。我把小木门打开，拉开帘子，隔着铁门看着他们。他们往后退了几步，没有人说话。我们之间从来没有如此的安静过，也从来没有站得如此之近。\\n“我以后不下去抓虫子了，就在家里玩。”我开口打破僵局，“爸妈把我关起来了。”\\n“胜利咯，‘肝炎病’关起来了。”有个小朋友喊了一句，但马上停了下来。小伙伴们一动不动地看着我。“我们把‘肝炎病’救出来”。接着，有三五个小伙伴开始拉扯铁门。\\n“不要碰，会得肝炎病的！”拉门动作立刻停了下来，“作死的你们，怎么给你们说的？！还不快回来吃饭！”远处的老人把孩子们催了回去。\\n下午上学前，小伙伴们会刻意绕到我家门口看一下，虽然没有交流，但我内心特别满足。\\n下午的时间是最难熬的，上午有人买菜、洗衣、做饭、整理家务，进进出出。到了下午，老人们和妇女们开始休息，周围变得特别安静。我不敢读课文，怕发出一点声响。\\n晚上父母终于回来了。以前，我总是在前面的小路口等他们，再一起买菜回家。而今天窗外他们的身影，显得特别远。父亲还是那样，手里拿着从来没洗干净过的水泥刀和胶桶，母亲跟在后面，低着头，手里拿了把玩具枪。\\n“爸爸！”我喊了一声，父亲抬头看到我，笑着说：“幺儿，爸爸给你买了好东西。”然后加块脚步进了筒子楼。\\n“妈妈！”我又喊了一声，母亲站在筒子楼外面，听到我的声音，竟开始哭了起来，“我的儿啊，我对不起你，我和你爸爸没用……”接着，母亲整个人蹲了下来。父亲冲到家门口，把东西放下，又飞奔下楼把母亲接了上来。\\n那天晚上，母亲很早就上床睡了，但直到很晚，我还能听到母亲的哭泣声。父亲像往常一样，教我语文、数学，还表扬我：“很听话，自己搞学习。”\\n这样的生活持续了大半年，“肝炎病”这词渐渐淡出了小伙伴的言语中，他们不再怕我，我反而成了他们偶尔关心的对象：“你不用上学么？”“你中午吃什么？”“你会不会死？”……后来，父亲还给我买了校服、红领巾和书包，还找木匠打了个小黑板放在家里。\\n但父母不似之前那样相处融洽了，他们经常争吵。\\n"}]}	2018-01-23 11:28:06	2018-01-23 11:28:06	\N	113	0	0	1	2	9
12	穿越峡谷去上学的八兄妹	{"ops":[{"insert":"午夜，雷声在山顶响开，滚落屋顶。\\n土屋孤立无援，单薄瓦顶不足以庇护，总令人担心屋子会被雷轰平，或者山峰被劈断跌落。闪电在黑夜的脸上划开无数道口子，窥视打击的目标。突然，一个炸雷在屋顶上引爆，房子似乎就要散架，猪有些惊慌地闷哼起来，屋里电线吱啦啦冒出火花，跟着就闻到一股焦糊味儿，父亲起身去查看。炸雷顺坡滚下断崖，在大峡谷中激起回响。\\n雷声渐歇，屋后岩石滴水，像是一头牲口在用心啃啮难得的骨殖，持续整夜。八兄妹仍旧在三张床上各自睡着，和同在屋顶下的家畜一起。这处屋顶下的生灵，仿佛都已熟悉这样的雷电之夜。\\n这是贵州毕节深山之中，一家八兄妹的夜晚，和世上别处无关。这座独处大峡谷的土屋，最近的一户邻居在两里路开外，许多事情都需要自己承受，就像它屋顶下一家人的生活。包括穿越大峡谷去上学，也有放牧、劈柴和耕种，还有，随人口众多、地土瘠薄而来的贫穷。\\n"},{"attributes":{"bold":true},"insert":" "},{"insert":"\\n从峡谷穿越\\n\\n从学校离开，大哥赵海背了一个篓，里面是几个弟妹的书，和一双从铺子里取来的旧鞋子。上次爸爸买了新鞋，因为是赊货，把旧鞋押在店家。\\n学校在纳雍县最偏远的一处山上，两年前道路才硬化，却又有不少地方被泥石流侵蚀，学校的操场也曾遭遇泥石流占据。学校所在的一条小街，没有像样的建筑物，远远比不上街道尽头矗立的三层顾姓宗祠。从这处缓坡开始，条条山系放射开去，其间穿插纵裂的大峡谷，就像这里混杂的汉、苗、彝各族一般。\\n两座由顾氏管理，冠名为“乐园”的学校，集聚了各条山系和峡谷中出生的孩子。每到周五，他们离开学校千篇一律的环境，回到千差万别的家庭中去。\\n走完从学校延伸的山背，边界显露出来，远近丛丛石山，石头是这里的统治者，人世的生活只是嵌入其中。再往下是大峡谷，罕有人迹。白垩质山崖壁立，形成庞大的障壁，带有深不见底的孔窍，轻微的动静言语，连同谷底的细微流水，都会发出回声，让人天然小心起来。在冬天，这段路程是个考验，黑暗更早从谷底升起来，追赶人的步伐。\\n赵海和他四个弟妹一起，到家需要近两个小时——加上未到学龄的三个弟妹，即使是在习惯生养众多的此地，也算是特别的一家。住家和上学的地方也属于两个乡，只为这条裂开的大峡谷。以前兄妹们在二十里外的锅圈岩乡上学，每月回家也要穿过这道峡谷，手里拿个电筒，到达家里已经入夜，“特别怕”。\\n"}]}	2018-02-12 14:14:29	2018-02-12 14:14:29	\N	150	0	1	2	2	0
13	第一颗开源卫星 UPSat 是如何制造的？	{"ops":[{"insert":"2017 年发射升空的立方体卫星 "},{"attributes":{"link":"https://en.wikipedia.org/wiki/UPSat"},"insert":"UPSat"},{"insert":" 是第一颗发射到轨道上的开源卫星，卫星使用开源软件和开源硬件，由希腊 Patras 大学和 Libre Space Foundation 基金会合作打造。基金会的运营总监 Pierros Papadeas 在欧洲自由开源软件会议 FOSDEM 上"},{"attributes":{"link":"https://www.youtube.com/watch?v=D8QtZ9IRLto"},"insert":"谈论"},{"insert":"了 UPSat 项目（"},{"attributes":{"link":"https://fosdem.org/2018/interviews/pierros-papadeas/"},"insert":"FAQ"},{"insert":"）。\\nPapadeas 称过去十年开源软件硬件模式已经在多个行业证明它是一种可持续的且可行的方法，他们这次尝试证明开源方法同样适用于太空行业。\\nUPSat 是一颗 2U 的微型方块卫星（20×10×10cm，外太空部署微型卫星的单位跟电脑主机类似），任务是电离层电浆密度的科学研究，它的尺寸不大，就像一台小电脑主机，设计上，所有的软硬件完全排除了商用元件，全部以开源的软硬件从头开始打造起。\\n当然这个卫星的源代码真的是开放的，全部放在自由太空基金会的 上，授权有 CERN OHLv1.2 与 GPLv3等。结构上，这卫星小归小，不过麻雀虽小五脏俱全。它由六大子系统组成：\\n"},{"attributes":{"bold":true},"insert":"EPS"},{"insert":"：Electrical Power Subsystem ，供电子系统的缩写，负责把太阳能模组转化的电力，供电到各系统，或者太阳能供电不足时，转用内部电池。"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"attributes":{"bold":true},"insert":"OBC"},{"insert":"：On Board Computer 的缩写，这是 UPSat 卫星的大脑， 它负责了于所有核心飞行功能，并执行所有子系统的主要决策和监控，STM32F4 微处理机是其心藏，其操作系统是 （ 开放源码的即时操作系统）。"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"attributes":{"bold":true},"insert":"COMMS"},{"insert":"：Communications Subsystem ，通讯子系统的缩写，顾名思义，这是负责通讯的，核心是 CC1120 通讯芯片。卫星上所有系统内与发送到地面站的的资讯封包都使用 ECSS-CCSDS（定义在 里 ）。"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"attributes":{"bold":true},"insert":"IAC"},{"insert":"：Image Acquisition Component ，影像取得模组的缩写，这是一个嵌入式 Linux 机板──DART4460 ，运作一个客制化 OpenWRT 系统，相机是一个 USB Ximea MU9PM-MH。"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"attributes":{"bold":true},"insert":"SU"},{"insert":"：Science Unit ，科学元件的缩写，在卫星的最顶端，透过 4 根探针分别收集电流，即时测量出电浆密度，测量电流范围从 1nA 至 2μA。"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"attributes":{"bold":true},"insert":"ADCS"},{"insert":"：Attitude Determination and Control Subsystem，姿态稳定与控制系统，基于磁力计的 3 轴主动系统，以安装在卫星四面太阳能电池板背面的矩形磁性线圈（x4）产生控制力矩。磁性线圈之所以安装在太阳能板背面，是因为可以透过太阳能板计算出阳光角度，来旋转调整卫星，此外还有 GPS 可以修正 SGP4 数值，与精准的时间更新。"},{"attributes":{"list":"bullet"},"insert":"\\n"},{"insert":"\\n"}]}	2018-02-14 11:37:30	2018-02-14 11:37:30	\N	3	0	0	0	3	0
10	stg	{"ops":[{"insert":"srgthbnrdtyhnb\\n"}]}	2018-02-11 11:17:11	2018-02-11 11:17:11	\N	4	0	0	0	2	0
7	 宝贝，我们只愿你快乐	{"ops":[{"insert":"上个月的一天，你让我下班后捡些树叶回家，你要写树叶信。我知道你想把信写在树叶上，让风儿寄给爸爸妈妈。那天的天色很晚风很烈，地上的树叶像是全部被邮寄出去了，我只好从树枝上摘了几片发黄的信笺。\\n现在，爸爸要给你回信了。\\n你能读这封信，大概会在四五年之后。无妨，这封信会静静长在岁月的大树上，直到你识字，才飘散落下。\\n“我两岁三个月。”现在，每次问你，你都这么回答，很认真地掰着手指头，完全不在乎手口不一。你出生的那天，护士在你的睡床上贴了一张便签，上面写着你的名字，出生日期，性别，重量，身长。如果我没记错的话，再有五天，你就两岁六个月了。\\n你出生时，头顶头发稀少，额头很高，现在的你依然额头饱满，稀疏的头发倒是补齐了，每天扎着朝天辫，晚上睡觉去掉皮筋，头发也高高立着。\\n只是睡觉不够踏实，玩心重，不玩累很难进入深层睡眠。刚过去的这个星期，你跟你的好朋友暖暖见了两次，比起以前楼上楼下住着时的见面次数，是少了很多。但是想想你们现在一个在通州，一个在烟台，能短时间内见上两次，非常难得。\\n你们在一起吃饭，暖暖只吃菜你只吃肉，像商量好了似的。在游乐场互相推扯，玩得很嗨，暖暖要走的时候，你哭着不让走：“我还要跟暖暖一起玩。”暖暖比你大三个月，性格很淡定，这是天生的。她二话不说，跟着爸妈就走了。\\n“暖暖是我最好的朋友。”这是你常常说的。\\n平时我们都要上班，带你出去找朋友玩的是你的姥姥。你还是一个小胚胎的时候，姥姥就来我们家了。等你出生了，姥姥基本上天天陪着你，三年没回过家。\\n每逢周末，你只要爸爸妈妈陪你玩，姥姥爱逗你：“我也想去，能带我去吗？”你一字一顿，大声拒绝：“不行。”\\n可是最近一个月你爱上了姥姥的床，洗漱一毕就爬上去，非要跟姥姥睡，怎么劝都不走。“没白疼。”姥姥一开始受宠若惊，给你讲她从她的姥姥那里听来的睡前故事。有时半夜醒来，又吵又闹，只让姥姥抱，爸爸妈妈走过去，你哭得更大声，直摆手：“你走开你走开。”\\n这样下去可不行，我思来想去，有了：“让姥姥装病。”当你看到姥姥粘着胶带的手渗出了血（番茄酱），你再没缠着姥姥，姥姥终于能好好休息了。\\n“你病好点没？”第二天早晨，姥姥没想到你还记着，还主动关心她，有小小的感动。其实姥姥也不算装病，年纪大了身体多多少少有点毛病，但还是爱觉不累地带你，是真的爱你。我想，你应该怀有一颗感恩的心。\\n除了带你玩，刮风下雨不能在外面玩的时候，姥姥会领你去图书馆。那里面有很多儿童绘本。图书馆很包容，只要你不大声喧哗不乱丢垃圾，一两岁的宝宝都允许进去。有一次，你只顾看书，忘了上厕所，尿了一地，图书馆阿姨还好心地递来拖把呢。\\n"}]}	2018-01-23 11:24:57	2018-01-23 11:24:57	\N	20	0	0	0	2	0
9	 JavaScript 之深入探索 WebSockets 和 HTTP/2	{"ops":[{"insert":"让服务器“主动”向客户端发送数据的技术已经存在相当长的一段时间了。 “"},{"attributes":{"link":"https://en.wikipedia.org/wiki/Push_technology"},"insert":"Push"},{"insert":"” 和 “"},{"attributes":{"link":"http://en.wikipedia.org/wiki/Comet_%28programming%29"},"insert":"Comet"},{"insert":"\\" 等等。\\n最常见的一种黑客攻击方法是让服务器产生一种需要向客户端发送数据的错觉，这称为"},{"attributes":{"bold":true},"insert":"长轮询"},{"insert":"。通过长时间轮询，客户端打开一个 HTTP 连接到服务器，保持打开直到发送响应。只要服务器有新的数据需要发送，它就会作为响应发送。\\n让我们看看一个非常简单的长轮询片段：\\n\\n使用 WebSocket ，你可以随心所欲地传输数据，而不用考虑与传统 HTTP 请求相关的开销。数据是通过一个 WebSocket 以"},{"attributes":{"bold":true},"insert":"消息"},{"insert":"进行传输的，每个消息由一个或多个包含你正在发送数据（有效负载）的"},{"attributes":{"bold":true},"insert":"帧"},{"insert":"组成。为确保消息在到达客户端时能够被正确地重建，每个帧是以 4-12 字节的数据做为前缀的。使用这种基于帧的消息传输系统有助于减少传输中非有效载荷的数据量，从而显着减少延迟。\\n"}]}	2018-02-08 17:50:08	2018-02-08 17:50:08	\N	169	0	1	1	2	10
11	春节的致命酒	{"ops":[{"insert":"报案大厅里围着十几号人，老雷的爱人和孩子一遍遍拨打他的电话，一直都是关机。\\n“你说这大过年的，老雷跑到哪儿去了！”爱人不住地抱怨，手里反复按下重拨键。\\n“小年”那天下午，老雷跟老婆孩子打招呼说，“晚上和朋友聚聚，不回来吃饭了”。四点半，他穿好外套离开了家，自此便杳无音讯。\\n“嫂子你别着急，雷哥可能是有别的事儿忙去了，恰好手机也没电了……”一个朋友劝老雷的爱人道。\\n这个劝慰明显难以奏效：一个工作稳定、家庭美满的中年男人，显然没有理由在寒冬腊月里一声不吭地“忙别的事儿去”。老雷爱人自然不会接受 ，反而冲那个朋友发起了脾气，“就是你们，大过年的叫着老雷喝喝喝，他要出点事儿，我们这个年还咋过！那天跟你们喝完酒，他去哪儿了？你说啊！”\\n我这才明白，原来站在报案大厅里的，除了老雷的爱人和孩子外，其余都是那晚与老雷“聚聚”的朋友。\\n"}]}	2018-02-12 14:12:47	2018-02-12 14:12:47	\N	70	0	0	0	2	0
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY tags (id, name, created_at, weight) FROM stdin;
1	科技	2018-01-23 03:19:52.161	1
2	音乐	2018-01-23 03:20:50.45	1
3	运动	2018-01-23 03:21:00.967	1
4	电影	2018-01-23 03:21:14.071	1
5	美食	2018-01-23 03:21:26.865	1
6		2018-02-14 11:37:30	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY users (id, username, email, password, avatar, created_at, updated_at, age, gender, phone, address, sign, fans, banner) FROM stdin;
1	weinan	twn39@163.com	$2a$10$rkcCX0pgpfQ27NjuVDJ0suDRzdmhYqjAFsSgzmT9zGxuoJxadYqpi	avatar.png	2017-11-29 14:53:37	2017-11-29 14:53:37	0	0				0	
2	呱呱	guagua@163.com	$2a$10$yhXWdR1yNB45YoZi2HhCYuD4rkotaWsqHfuyT65qcpWwEaeIccpAi	15180713496256585.jpg	2018-01-23 11:23:13	2018-01-23 11:23:13	0	0				0	15185200138373765.jpg
3	twn39	twn39@126.com	$2a$10$tor0UfLJpwSOx65BFdbj0u/thcuq6znL2nDEttZ.kpwAkZAGwlZCC	15185792865633747.jpg	2018-02-13 19:10:41	2018-02-13 19:10:41	0	0				0	15185787205341050.jpg
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('comments_id_seq', 10, true);


--
-- Name: letters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('letters_id_seq', 1, false);


--
-- Name: notices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('notices_id_seq', 1, false);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('posts_id_seq', 13, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('tags_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('users_id_seq', 3, true);


--
-- Name: bookmarks bookmarks_user_id_post_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY bookmarks
    ADD CONSTRAINT bookmarks_user_id_post_id_pk PRIMARY KEY (user_id, post_id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: follows follows_user_id_follow_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY follows
    ADD CONSTRAINT follows_user_id_follow_id_pk PRIMARY KEY (user_id, follow_id);


--
-- Name: letters letters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY letters
    ADD CONSTRAINT letters_pkey PRIMARY KEY (id);


--
-- Name: likes likes_user_id_post_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY likes
    ADD CONSTRAINT likes_user_id_post_id_pk PRIMARY KEY (user_id, post_id);


--
-- Name: notices notices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY notices
    ADD CONSTRAINT notices_pkey PRIMARY KEY (id);


--
-- Name: post_tag post_tag_post_id_tag_id_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY post_tag
    ADD CONSTRAINT post_tag_post_id_tag_id_pk PRIMARY KEY (post_id, tag_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments_post_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX comments_post_id_index ON comments USING btree (post_id);


--
-- Name: comments_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX comments_user_id_index ON comments USING btree (user_id);


--
-- Name: posts_user_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX posts_user_id_index ON posts USING btree (user_id);


--
-- Name: users_email_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_uindex ON users USING btree (email);


--
-- Name: users_username_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_username_uindex ON users USING btree (username);


--
-- PostgreSQL database dump complete
--

