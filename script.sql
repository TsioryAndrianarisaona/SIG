drop table DELIMITATION;


drop table PROPRIETAIRE;

drop table TITRE;

drop table VILLE;

/*==============================================================*/
/* Table : PROPRIETAIRE                                         */
/*==============================================================*/
create table PROPRIETAIRE (
   PROPRIETAIREID       SERIAL               not null,
   NOM                  VARCHAR(30)          null,
   constraint PK_PROPRIETAIRE primary key (PROPRIETAIREID)
);

/*==============================================================*/
/* Table : TITRE                                                */
/*==============================================================*/
create table TITRE (
   TITREID              SERIAL               not null,
   PROPRIETAIREID       INT4                 null,
   PRIX                 DECIMAL(10,4)        null,
   POLYGONE             geometry             null,
   constraint PK_TITRE primary key (TITREID)
);

/*==============================================================*/
/* Table : VILLE                                                */
/*==============================================================*/
create table VILLE (
   VILLEID              SERIAL               not null,
   NOM                  VARCHAR(30)          null,
   LONGITUDE            DECIMAL(20,8)        null,
   LATITUDE             DECIMAL(20,8)        null,
   ZOOM                 INT8                 null,
   constraint PK_VILLE primary key (VILLEID)
);

alter table TITRE
   add constraint FK_TITRE_REFERENCE_PROPRIET foreign key (PROPRIETAIREID)
      references PROPRIETAIRE (PROPRIETAIREID)
      on delete restrict on update restrict;

/*==============================================================*/
/* Table : DATA                                                */
/*==============================================================*/
insert into VILLE values (default,'Andoharanofotsy',47.5411,-18.9791935,15);
insert into VILLE values (default,'Tanjombato',47.525162,-18.959383,15);

insert into  PROPRIETAIRE values (default,'PUBLIC');
insert into  PROPRIETAIRE values (default,'PRIVATE');

insert into TITRE values (default,1,120,ST_Polygon(ST_GeomFromText('LINESTRING(
   -18.97966 47.544434,
   -18.979498 47.541001,
   -18.9981283 47.538039 ,
   -18.971579 47.534563 ,
   -18.972614 47.539659 ,
   -18.97966 47.544434 
)'),4326));
insert into TITRE values (default,2,120,ST_Polygon(ST_GeomFromText('LINESTRING(
   -18.975171 47.544723 ,
   -18.973669 47.54659 ,
   -18.974562 47.547277 ,
   -18.973892 47.548779 ,
   -18.972837 47.545818 ,
   -18.975171 47.544723
)'),4326));


-- Polygone 1
-- insert into DELIMITATION values (default,47.544434,-18.97966,1);
-- insert into DELIMITATION values (default,47.541001,-18.979498,1);
-- insert into DELIMITATION values (default,47.538039,-18.9981283,1);
-- insert into DELIMITATION values (default,47.536358,-18.981131,1);
-- insert into DELIMITATION values (default,47.533426,-18.978341,1);
-- insert into DELIMITATION values (default,47.533748,-18.974202,1);
-- insert into DELIMITATION values (default,47.534563,-18.971579,1);
-- insert into DELIMITATION values (default,47.537471,-18.971073,1);
-- insert into DELIMITATION values (default,47.539659,-18.972614,1);
-- insert into DELIMITATION values (default,47.54187,-18.972908,1);
-- insert into DELIMITATION values (default,47.542224,-18.971894,1);
-- insert into DELIMITATION values (default,47.544208,-18.971843,1);
-- insert into DELIMITATION values (default,47.544841,-18.973902,1);

-- --Polygone 2
-- insert into DELIMITATION values (default,47.544723,-18.975171,2);
-- insert into DELIMITATION values (default,47.54659,-18.973669,2);
-- insert into DELIMITATION values (default,47.547277,-18.974562,2);
-- insert into DELIMITATION values (default,47.548779,-18.973892,2);
-- insert into DELIMITATION values (default,47.549616,-18.972208,2);
-- insert into DELIMITATION values (default,47.547706,-18.970544,2);
-- insert into DELIMITATION values (default,47.545818,-18.972837,2);

-- --Polygone 3
-- insert into DELIMITATION values (default,47.544487,-18.979677,3);
-- insert into DELIMITATION values (default,47.552491,-18.981605,3);
-- insert into DELIMITATION values (default,47.5488,-18.976918,3);
-- insert into DELIMITATION values (default,47.550238,-18.972758,3);
-- insert into DELIMITATION values (default,47.548779,-18.974056,3);
-- insert into DELIMITATION values (default,47.544766,-18.975396,3);



-- -- --Polygone 5
-- insert into DELIMITATION values (default,47.544659,-18.979769,4);
-- insert into DELIMITATION values (default,47.547577,-18.980906,4);
-- insert into DELIMITATION values (default,47.549358,-18.985674,4);
-- insert into DELIMITATION values (default,47.543028,-18.984944,4);

-- -- --Polygone 6
-- insert into DELIMITATION values (default,47.54305,-18.984984,5);
-- insert into DELIMITATION values (default,47.549187,-18.986181,5);
-- insert into DELIMITATION values (default,47.546268,-18.98886,5);
-- insert into DELIMITATION values (default,47.542642,-18.987338,5);




-- insert into DELIMITATION values (default , 47.528828,-18.955918,7);
-- insert into DELIMITATION values (default  ,  47.525652,-18.95673,7);
-- insert into DELIMITATION values (default  , 47.519215,-18.954782,7);
-- insert into DELIMITATION values (default  , 47.518872,-18.955188,7);
-- insert into DELIMITATION values (default  ,47.515782, -18.954701,7);
-- insert into DELIMITATION values (default  , 47.51046, -18.95949,7);
-- insert into DELIMITATION values (default  ,47.511401, -18.963272,7);
-- insert into DELIMITATION values (default  ,  47.508569, -18.974555,7);
-- insert into DELIMITATION values (default  , 47.520585,-18.972445,7);
-- insert into DELIMITATION values (default  , 47.525563,-18.967574,7);
-- insert into DELIMITATION values (default  , 47.529597, -18.969523,7);


-- insert into DELIMITATION values (default, 47.529211,-18.969725 ,8);
-- insert into DELIMITATION values (default, 47.52655, -18.967574,8);
-- insert into DELIMITATION values (default, 47.523546, -18.972201,8);
-- insert into DELIMITATION values (default ,47.512388, -18.974798,8);
-- insert into DELIMITATION values (default, 47.528267,-18.978045,8);
-- insert into DELIMITATION values (default, 47.528954,-18.979587,8);
-- insert into DELIMITATION values (default, 47.53273, -18.97975,8);
