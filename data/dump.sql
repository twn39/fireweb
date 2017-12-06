--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.10
-- Dumped by pg_dump version 9.5.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ningbo; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE ningbo WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'zh_CN.UTF-8' LC_CTYPE = 'zh_CN.UTF-8';


ALTER DATABASE ningbo OWNER TO postgres;

\connect ningbo

SET statement_timeout = 0;
SET lock_timeout = 0;
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
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: twn39
--

CREATE TABLE bookmarks (
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp without time zone
);


ALTER TABLE bookmarks OWNER TO twn39;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: twn39
--

CREATE TABLE comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    content text,
    created_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE comments OWNER TO twn39;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: twn39
--

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE comments_id_seq OWNER TO twn39;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: twn39
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- Name: follows; Type: TABLE; Schema: public; Owner: twn39
--

CREATE TABLE follows (
    user_id integer NOT NULL,
    follow_id integer NOT NULL,
    created_at timestamp without time zone
);


ALTER TABLE follows OWNER TO twn39;

--
-- Name: likes; Type: TABLE; Schema: public; Owner: twn39
--

CREATE TABLE likes (
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone
);


ALTER TABLE likes OWNER TO twn39;

--
-- Name: notices; Type: TABLE; Schema: public; Owner: twn39
--

CREATE TABLE notices (
    id integer NOT NULL,
    content text NOT NULL,
    type integer NOT NULL,
    created_at timestamp without time zone,
    readed_at timestamp without time zone
);


ALTER TABLE notices OWNER TO twn39;

--
-- Name: notices_id_seq; Type: SEQUENCE; Schema: public; Owner: twn39
--

CREATE SEQUENCE notices_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE notices_id_seq OWNER TO twn39;

--
-- Name: notices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: twn39
--

ALTER SEQUENCE notices_id_seq OWNED BY notices.id;


--
-- Name: post_tag; Type: TABLE; Schema: public; Owner: twn39
--

CREATE TABLE post_tag (
    post_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE post_tag OWNER TO twn39;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: twn39
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
    user_id integer NOT NULL
);


ALTER TABLE posts OWNER TO twn39;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: twn39
--

CREATE SEQUENCE posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE posts_id_seq OWNER TO twn39;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: twn39
--

ALTER SEQUENCE posts_id_seq OWNED BY posts.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: twn39
--

CREATE TABLE tags (
    id integer NOT NULL,
    name character varying(20),
    created_at timestamp without time zone,
    weight integer DEFAULT 0
);


ALTER TABLE tags OWNER TO twn39;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: twn39
--

CREATE SEQUENCE tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tags_id_seq OWNER TO twn39;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: twn39
--

ALTER SEQUENCE tags_id_seq OWNED BY tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: twn39
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
    fans integer DEFAULT 0
);


ALTER TABLE users OWNER TO twn39;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: twn39
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO twn39;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: twn39
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY notices ALTER COLUMN id SET DEFAULT nextval('notices_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY posts ALTER COLUMN id SET DEFAULT nextval('posts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY tags ALTER COLUMN id SET DEFAULT nextval('tags_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: twn39
--

COPY bookmarks (user_id, post_id, created_at) FROM stdin;
1	5	2017-12-05 18:43:42
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: twn39
--

COPY comments (id, user_id, post_id, content, created_at, deleted_at) FROM stdin;
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: twn39
--

SELECT pg_catalog.setval('comments_id_seq', 1, false);


--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: twn39
--

COPY follows (user_id, follow_id, created_at) FROM stdin;
\.


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: twn39
--

COPY likes (post_id, user_id, created_at) FROM stdin;
\.


--
-- Data for Name: notices; Type: TABLE DATA; Schema: public; Owner: twn39
--

COPY notices (id, content, type, created_at, readed_at) FROM stdin;
\.


--
-- Name: notices_id_seq; Type: SEQUENCE SET; Schema: public; Owner: twn39
--

SELECT pg_catalog.setval('notices_id_seq', 1, false);


--
-- Data for Name: post_tag; Type: TABLE DATA; Schema: public; Owner: twn39
--

COPY post_tag (post_id, tag_id) FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: twn39
--

COPY posts (id, title, content, created_at, updated_at, deleted_at, views, comments, bookmarks, likes, user_id) FROM stdin;
6	test	nihao	2017-11-30 18:22:22	2017-11-30 18:22:22	\N	0	0	0	0	1
4	hi	nihao	2017-11-30 16:43:58	2017-11-30 16:43:58	2017-11-30 16:58:00	0	0	0	0	1
3	hello	test	2017-11-29 19:18:57	2017-11-29 19:18:57	2017-11-29 19:18:57	0	0	0	0	1
5	test	nihao	2017-11-30 18:22:15	2017-11-30 18:22:15	\N	0	0	1	0	1
\.


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: twn39
--

SELECT pg_catalog.setval('posts_id_seq', 6, true);


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: twn39
--

COPY tags (id, name, created_at, weight) FROM stdin;
\.


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: twn39
--

SELECT pg_catalog.setval('tags_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: twn39
--

COPY users (id, username, email, password, avatar, created_at, updated_at, age, gender, phone, address, sign, fans) FROM stdin;
1	weinan	twn39@163.com	$2a$10$rkcCX0pgpfQ27NjuVDJ0suDRzdmhYqjAFsSgzmT9zGxuoJxadYqpi	avatar.png	2017-11-29 14:53:37	2017-11-29 14:53:37	0	0				0
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: twn39
--

SELECT pg_catalog.setval('users_id_seq', 1, true);


--
-- Name: bookmarks_user_id_post_id_pk; Type: CONSTRAINT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY bookmarks
    ADD CONSTRAINT bookmarks_user_id_post_id_pk PRIMARY KEY (user_id, post_id);


--
-- Name: comments_pkey; Type: CONSTRAINT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: follows_user_id_follow_id_pk; Type: CONSTRAINT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY follows
    ADD CONSTRAINT follows_user_id_follow_id_pk PRIMARY KEY (user_id, follow_id);


--
-- Name: likes_user_id_post_id_pk; Type: CONSTRAINT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY likes
    ADD CONSTRAINT likes_user_id_post_id_pk PRIMARY KEY (user_id, post_id);


--
-- Name: notices_pkey; Type: CONSTRAINT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY notices
    ADD CONSTRAINT notices_pkey PRIMARY KEY (id);


--
-- Name: post_tag_post_id_tag_id_pk; Type: CONSTRAINT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY post_tag
    ADD CONSTRAINT post_tag_post_id_tag_id_pk PRIMARY KEY (post_id, tag_id);


--
-- Name: posts_pkey; Type: CONSTRAINT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: tags_pkey; Type: CONSTRAINT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: twn39
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: comments_post_id_index; Type: INDEX; Schema: public; Owner: twn39
--

CREATE INDEX comments_post_id_index ON comments USING btree (post_id);


--
-- Name: comments_user_id_index; Type: INDEX; Schema: public; Owner: twn39
--

CREATE INDEX comments_user_id_index ON comments USING btree (user_id);


--
-- Name: posts_user_id_index; Type: INDEX; Schema: public; Owner: twn39
--

CREATE INDEX posts_user_id_index ON posts USING btree (user_id);


--
-- Name: users_email_uindex; Type: INDEX; Schema: public; Owner: twn39
--

CREATE UNIQUE INDEX users_email_uindex ON users USING btree (email);


--
-- Name: users_username_uindex; Type: INDEX; Schema: public; Owner: twn39
--

CREATE UNIQUE INDEX users_username_uindex ON users USING btree (username);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

