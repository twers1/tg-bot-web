import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'KERAKUR. Икра баклажановая', price: 230, description: '500 гр., в наличие есть и острая', image: 'https://armproducti.ru/imgtmp/orign_100_w/data/foto/kerakur/ikra.jpg'},
    {id: '2', title: 'KERAKUR. Аджабсандал', price: 250, description: '1л', image: 'https://bon-jur.ru/wp-content/uploads/2021/12/AJAP-1000x1000-1.jpg' },
    {id: '3', title: 'KERAKUR. Бамия маринованная', price: 210, description: 'с чесноком(500гр)', image: 'https://basket-02.wb.ru/vol162/part16210/16210487/images/big/1.jpg'},
    {id: '4', title: 'KERAKUR. Иман Баялды ', price: 240, description: '500гр, 650гр', image: 'https://basket-01.wb.ru/vol116/part11677/11677844/images/big/1.jpg'},
    {id: '5', title: 'KERAKUR. Томаты маринованные', price: 250, description: '1л', image: 'https://avatars.mds.yandex.net/get-eda/3735503/b01d36c69a93f8cfbd72d0c2f19b2f5c/800x800nocrop'},
    {id: '6', title: 'KERAKUR. Листья виноградные консервированные', price: 600, description: '600гр', image: 'https://media.vprok.ru/products/x250/cg/sz/uxa5srup5z3n3yks3pza32t3zjkwszcg.jpeg'},
    {id: '7', title: 'KERAKUR. Аджика', price: 250, description: '500мл, 350мл, в наличии есть острая', image: 'https://img.vkusvill.ru/pim/images/site_LargeWebP/69eedd5b-3efc-4e72-afc8-64d5f2dbdfb3.jpg?1646832248.989'},
    {id: '8', title: 'KERAKUR. Аппетит', price: 250, description: '500гр', image: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/-1/96/44/26/67/63/3/100024903757b0.jpg'},
    {id: '9', title: 'KERAKUR. Маринованный красный перец', price: 250, description: '500гр', image: 'https://avatars.mds.yandex.net/get-mpic/5145248/img_id4533068567984307591.jpeg/orig'},
    {id: '10', title: 'KERAKUR. Овощи печеные', price: 12000, description: '1л, на костре', image: 'https://avatars.mds.yandex.net/get-eda/3401132/67878b4727c36493ab0c5efb6b84878a/orig'},
    {id: '11', title: 'KERAKUR. Огурцы маринованные', price: 12000, description: '1л', image: 'https://apeti.ru/upload/iblock/f00/ogurtsy_marinovannye_kerakur_950_g.jpg'},
    {id: '12', title: 'KERAKUR. Томаты очищенные в собственном соку', price: 12000, description: '950гр', image: 'https://basket-01.wb.ru/vol130/part13026/13026879/images/big/1.jpg'},
    {id: '13', title: 'KERAKUR. Маринад Ассорти', price: 12000, description: '1л', image: 'https://cdn0.ozone.ru/multimedia/c250/1023565970.jpg'},
    {id: '14', title: 'KERAKUR. Томатная паста', price: 220, description: '500гр', image: 'https://24-ok.ru/image/lot/hires/2021/03/05/21/7c710a4e1b1f87ad8d48730bc7d8d77d.jpg'},
    {id: '15', title: 'KERAKUR. Перец острый с чесноком и зеленью', price: 170, description: '450гр', image: 'https://freshlavka.com/wp-content/uploads/2020/04/9P2A3078-1.jpg'},
    {id: '16', title: 'KERAKUR. Лечо', price: 1170, description: '650гр', image: 'https://img.vkusvill.ru/pim/images/site_LargeWebP/2c39a594-dcea-4b56-951c-0f464c7a0a23.jpg?1646832606.9341'},
    {id: '17', title: 'KERAKUR. Абрикос', price: 250, description: '650гр, джем', image: 'https://img.vkusvill.ru/pim/images/site/c5d7341d-b90d-487a-add3-86d358211ef3.jpg?1646832430.6169?21_10_2022_23_27_27'},
    {id: '18', title: 'KERAKUR. Айва', price: 12000, description: '610гр, варенье', image: 'https://xaviar.ru/uploads/product/200/221/varene-iz-ayvy-kerakur»-610_2022-03-15_13-15-24.jpg'},
    {id: '19', title: 'KERAKUR. Белая черешня', price: 250, description: '610гр, варенье', image: 'https://apeti.ru/upload/iblock/e9c/varene_kerakur_belaya_chereshnya_610_g.jpg'},
    {id: '20', title: 'KERAKUR. Вишня', price: 12000, description: '610гр, варенье', image: 'https://newyog.ru/upload/iblock/064/aon4j1w9ypdsqgsazbkukzgokqe70ecd.jpg'},
    {id: '21', title: 'KERAKUR. Грецкий орех', price: 250, description: '610гр, варенье', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3N0YXRpY3Mvc3ByZWUvcHJvZHVjdHMvMjAyMTc0MS9vcmlnaW5hbC8xNjExMzE5LmpwZz8xNjE5MDEyMTM4.jpg'},
    {id: '22', title: 'KERAKUR. Инжир', price: 220, description: '610гр, джем', image: 'https://basket-03.wb.ru/vol293/part29324/29324764/images/big/1.jpg'},
    {id: '23', title: 'KERAKUR. Кизил', price: 190, description: '610гр, варенье', image: 'https://basket-03.wb.ru/vol293/part29322/29322536/images/big/1.jpg'},
    {id: '24', title: 'KERAKUR. Клубника', price: 210, description: '610гр, варенье', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9idXNpbmVzcy5zYmVybWFya2V0LnJ1L3NwcmVlL3Byb2R1Y3RzLzIwMjE3Mzkvb3JpZ2luYWwvMTYxMTMxNS5qcGc_MTYxOTAxMjEzNQ.jpg'},
    {id: '25', title: 'KERAKUR. Малина', price: 12000, description: '610гр, варенье', image: 'https://img.vkusvill.ru/pim/images/site_LargeWebP/8127a18c-e19a-49c1-ad8f-5f78a7bf0f37.jpg?1646832429.7289'},
    {id: '26', title: 'KERAKUR. Персик', price: 12000, description: '610гр, джем', image: 'https://basket-03.wb.ru/vol428/part42879/42879068/images/big/1.jpg'},
    {id: '27', title: 'KERAKUR. Тутовник(шелковица)', price: 230, description: '610гр, варенье, белая тута', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3NwcmVlL3Byb2R1Y3RzLzIwMjE3Mjkvb3JpZ2luYWwvMTYxMTI5MS5qcGc_MTYxOTAxMjExOQ.jpg'},
    {id: '28', title: 'KERAKUR. Тыква', price: 230, description: '500гр, варенье', image: 'https://sun9-80.userapi.com/impg/foL5kKKk7RYaFjexYtbDAVnneUlWiCuCHf5_Sw/f65UTgG29Os.jpg?size=0x400&crop=0.118,0.016,0.745,0.875&quality=95&sign=40e333fff5daf72aeb6d9b545af877cf'},
    {id: '29', title: 'KERAKUR. Компот из вишни', price: 12000, description: '1л', image: 'https://basket-03.wb.ru/vol290/part29020/29020553/images/big/1.jpg'},
    {id: '30', title: 'KERAKUR. Икра кабачковая', price: 255, description: 'обычная, острая', image: 'https://www.waterbaikal.ru/image/cache/catalog/miniral/jermuk/voda-jermuk-05-glass-768x576.jpg'},
    {id: '31', title: 'Минеральная Вода Джермук, пэт', price: 12000, description: '0.5, 1л', image: 'https://apeti.ru/upload/iblock/67d/voda_mineralnaya_dzhermuk_0_5_l.jpg'},
    {id: '32', title: 'Минеральная Вода Бжни', price: 12000, description: '0.5 - стекло, пэт; 1л - пэт', image: 'https://www.healthwaters.ru/upload/iblock/f8f/f8fb6eff21523d70e5134cbc483a889f.jpg'},
    {id: '33', title: 'Родниковая вода Апаран', price: 85, description: '0.5л, ,1л, 1.5л - пэт', image: ''},
    {id: '34', title: 'Минеральная вода Джермук, стекло ', price: 255, description: '0.5л,  стекло', image: ''},
    {id: '35', title: 'Ecofood. Компот из айвы', price: 185, description: '1л', image: 'https://finegastronomy.ru/upload/iblock/576/yljs0z23g49lgnp00h4rwuroqn0400gj.jpeg'},
    {id: '36', title: 'Ecofood. Компот из персика', price: 185, description: '1л', image: 'https://alania-market.ru/image/cache/catalog/konservy-sousy-pripravy/fruktovye-konservy/8/16350691-1-360x360.jpg'},
    {id: '37', title: 'Ecofood. Компот из абрикоса', price: 185, description: '1л', image: 'https://avatars.mds.yandex.net/get-mpic/5209712/img_id195476974076435664.png/orig'},
    {id: '38', title: 'Tamara fruit. Нектар из абрикосов ', price: 210, description: '1л', image: 'https://cdn1.ozone.ru/s3/multimedia-6/c1000/6046688514.jpg'},
    {id: '39', title: 'Tamara fruit. Нектар из персиков', price: 210, description: '1л', image: 'https://gcdn.utkonos.ru/resample/500x500q90/images/photo/3460/3460361H.jpg?mtime=6142fce5'},
    {id: '40', title: 'Tamara fruit. Нектар из вишни', price: 210, description: '1л', image: 'https://cdn1.ozone.ru/s3/multimedia-2/c1000/6000190514.jpg'},
    {id: '41', title: 'Tamara fruit. Нектар из шиповника', price: 210, description: '1л', image: 'https://ethnopolis.ru/wp-content/uploads/2022/10/1480028.png'},
    {id: '42', title: 'Tamara fruit. Нектар из яблока', price: 210, description: '1л, яблочный сок', image: 'https://cdn1.ozone.ru/s3/multimedia-b/c1000/6025284215.jpg'},
    {id: '43', title: 'Tamara fruit. Нектар из малины', price: 240, description: '1л', image: 'https://cdn1.ozone.ru/s3/multimedia-6/c1000/6025394658.jpg'},
    {id: '44', title: 'Tamara fruit. Нектар из граната', price: 260, description: '1л', image: 'https://ethnopolis.ru/wp-content/uploads/2022/10/1480019.jpg'},
    {id: '45', title: 'Yan. Ананас', price: 240, description: '0,93л., сок', image: 'https://napitkistore.ru/wp-content/uploads/2017/03/sok-yan-tropicheskij-0.93-l.jpg'},
    {id: '46', title: 'Yan. Красный апельсин', price: 12000, description: '0,93л., сок', image: 'https://arm-food.ru/wa-data/public/shop/products/19/01/119/images/974/krasnyy-apelsin-930.750x0.jpg'},
    {id: '47', title: 'Yan. Апельсин', price: 12000, description: '0,93л., сок', image: 'https://avatars.mds.yandex.net/get-mpic/4334746/img_id8171040962226206517.jpeg/orig'},
    {id: '48', title: 'Yan. Банан', price: 12000, description: '0,93л., сок', image: 'https://avatars.mds.yandex.net/get-mpic/1865885/img_id6746647864933535679.jpeg/orig'},
    {id: '49', title: 'Yan. Зеленое яблоко', price: 12000, description: '0,93л., сок', image: 'https://irkdelikates.ru/pic/b9cc4424926e9cc1340b01236e7c6e0d/nektar-zelenoe-yabloko-yan-0.93-l-st.b-1.6-armeniya-1.jpg'},
    {id: '50', title: 'Yan. Шиповник', price: 12000, description: '0,93л., сок', image: 'https://sbermarket.ru/statics/spree/products/3412681/original/17862905.jpg?1640185388'},
    {id: '51', title: 'Yan. Гранат', price: 12000, description: '0,93л., сок', image: 'https://avatars.mds.yandex.net/get-mpic/5246613/img_id1686396562673862032.png/orig'},
    {id: '52', title: 'Yan. Манго', price: 12000, description: '0,93л., сок', image: 'https://avatars.mds.yandex.net/get-mpic/5275484/img_id3625041831368782559.jpeg/orig'},
    {id: '53', title: 'Yan. Облепиха', price: 12000, description: '0,93л., сок', image: 'https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/ef/a1/07f441fd65d554206e8d3865c70b.jpg'},
    {id: '54', title: 'Yan. Тропический', price: 12000, description: '0,93л., сок', image: 'https://sbermarket.ru/spree/products/558386/original/417648.jpg?1599756525'},
    {id: '55', title: 'Yan. ', price: 12000, description: '0,93л., сок', image: ''},
    {id: '56', title: 'Maaza. Манго', price: 80, description: '250мл - 80 руб, 1л - 200, 1.5л. - 230', image: 'https://cdn.100sp.ru/pictures/477531693'},
    {id: '57', title: 'Maaza. Яблоко', price: 80, description: '250мл - 80 руб, 1л - 200, 1.5л. - 230', image: 'https://tsiran.am/images/products/060630/cf6c3bf255504015230e9c4b8ad89f79/764x600.JPG'},
    {id: '58', title: 'Zovk. Шиповник', price: 80, description: '250мл - 80 руб, 1л - 200, 1.5л. - 230', image: 'https://www.sas.am/upload/Sh/imageCache/171/651/6517821983947399.jpg'},
    {id: '59', title: 'Noyan. Вишня', price: 45, description: '200мл', image: 'https://avatars.mds.yandex.net/get-mpic/4353087/img_id5653770386752001950.jpeg/orig'},
    {id: '60', title: 'Noyan. Ананас', price: 45, description: '200мл', image: 'https://avatars.mds.yandex.net/get-mpic/4362876/img_id6599198538109662970.jpeg/5'},
    {id: '61', title: 'Noyan. Яблоко с мякотью', price: 45, description: '200мл', image: 'https://avatars.mds.yandex.net/get-mpic/4466970/img_id8332669616838953157.jpeg/orig'},
    {id: '62', title: 'Любимый. Тропический микс', price: 25, description: '200мл', image: 'https://prazdnichniy40.ru/system/App/Models/Product/3559/cover/main/medium/1-00048005.jpg'},
    {id: '63', title: 'Любимый. Вишневая черешня', price: 25, description: '200мл', image: 'http://otlichnye-tseny.ru/upload/iblock/263/dncbp1p5106419p33fx3vev2q5euhfah.jpg'},
    {id: '64', title: 'Любимый. Яблоко', price: 25, description: '200мл', image: 'https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/9f/5f/689f076d61194bc4f585a28bd93a.jpg'},
    {id: '65', title: 'Добрый. Яблоко', price: 28, description: '200мл', image: 'https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/05/5a/e71faf450e725bf4fac450b4bc4c.jpg'},
    {id: '66', title: 'Armatfood. Компот из терна', price: 205, description: '1.1л', image: 'https://gurmanarmenia.ru/image/cache/catalog/irafoto/armatfud/tern-228x228.png'},
    {id: '67', title: 'Armatfood. Компот из абрикоса и вишни', price: 205, description: '1.1л', image: 'https://eda.yandex.ru/images/3454897/42ebc7178b2a322cb64d58189f211c2c-680x500.jpeg'},
    {id: '68', title: 'Armatfood. Компот из клубники', price: 205, description: '1.1л(фотография не соответвует существующему)', image: 'https://avatars.mds.yandex.net/get-mpic/5238263/img_id2389603678739428058.jpeg/orig'},
    {id: '69', title: 'Armatfood. Компот из вишни', price: 205, description: '1.1л', image: 'https://gurmanarmenia.ru/image/cache/catalog/irafoto/armatfud/vishnja-228x228.png'},
    {id: '70', title: 'Armatfood. Компот из кизила', price: 190, description: '1.1л', image: 'https://cdn1.ozone.ru/s3/multimedia-q/c500/6067785794.jpg'},
    {id: '71', title: 'Armatfood. Компот айвовый', price: 190, description: '1.1л', image: 'https://api.investin.am/storage/products/21.-Kompot-iz-aivy-1.1l.jpg'},
    {id: '72', title: 'Armatfood. Компот из облепихи', price: 220, description: '1.1л', image: 'https://dariarmenii.ru/thumb/2/KhE-8EXR5uYFxNTHjZ4_1g/450r450/d/armatfood_product-photos_20_rus_preview_web_20201127.jpg'},
    {id: '73', title: 'Armatfood. Компот из фейхоа', price: 220, description: '1.1л', image: ''},
    {id: '74', title: 'Armatfood. Компот персиковый', price: 205, description: '1.1л', image: 'https://dariarmenii.ru/thumb/2/d8UyMcdW2Lahy6drbN47oA/r/d/armatfood_product-photos_18_rus_preview_web_20201127.jpg'},
    {id: '75', title: 'Menq. Вишня', price: 120, description: '1л, сок', image: 'https://avatars.mds.yandex.net/get-mpic/4785755/img_id5175251967552092928.jpeg/orig'},
    {id: '76', title: 'Menq. Манго', price: 120, description: '1л, сок', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3N0YXRpY3Mvc3ByZWUvcHJvZHVjdHMvMzQxODc4Mi9vcmlnaW5hbC8xNTkzMzc4MV8zLmpwZz8xNjQwMjQzMDc2.jpg'},
    {id: '77', title: 'Menq. Томат острый ', price: 120, description: '1л, сок', image: 'https://avatars.mds.yandex.net/get-mpic/3741589/img_id2246296204828655857.jpeg/orig'},
    {id: '78', title: 'Menq. Яблоко', price: 120, description: '1л, сок', image: 'https://otziv-otziv.ru/assets/cache/images/417/4162/img_id4061707761565934985-600x600-d90.jpeg'},
    {id: '79', title: 'Ararat Премиум. Банан и клубника', price: 175, description: '0.97л.', image: 'https://ae04.alicdn.com/kf/Uf7041cfa87a64c67b5552fd4f7508f67O/ARARAT-PREMIUM.png'},
    {id: '80', title: 'Ararat Премиум. Мультифрукт', price: 175, description: '0.97л.', image: 'https://basket-03.wb.ru/vol427/part42726/42726637/images/big/1.jpg'},
    {id: '81', title: 'Ararat Премиум. Армянская вишня', price: 170, description: '0.97л.', image: 'https://avatars.mds.yandex.net/get-eda/3529621/d1a941fd9bf2f3daa18c01a2e6566f16/800x800nocrop'},
    {id: '82', title: 'Ararat Премиум. Апельсин', price: 220, description: '0.97л.', image: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/21/19/09/96/53/41/600001207313b0.jpeg'},
    {id: '83', title: 'Ararat Премиум. Армянский томат', price: 170, description: '0.97л.', image: 'https://sbermarket.ru/statics/spree/products/570319/original/429712_1.jpg?1640006110'},
    {id: '84', title: 'Noyan Премимум. Томат', price: 155, description: '1л.', image: 'https://imgproxy.sbermarket.ru/imgproxy/size-500-500/aHR0cHM6Ly9zYmVybWFya2V0LnJ1L3N0YXRpY3Mvc3ByZWUvcHJvZHVjdHMvMzI2OTE5L29yaWdpbmFsLzM0ODg2Ni5qcGc_MTU5NjAyNjg4OA.jpg'},
    {id: '85', title: 'Noyan Премимум. Гранат', price: 330, description: '1л.', image: 'https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/a2/46/ff8a778032dcefc1b0ab7c963af5.jpg'},
    {id: '86', title: 'Noyan Премимум. Яблоко', price: 155, description: '1л.', image: 'https://www.sas.am/upload/iblock/3c9/000689.jpg'},
    {id: '87', title: 'Noyan Премимум. Черная смородина-виноград', price: 160, description: '1л.', image: 'https://cdn1.ozone.ru/multimedia/c1000/1023214267.jpg'},
    {id: '88', title: 'Noyan Премимум. Банан', price: 160, description: '1л.', image: 'https://cdn1.ozone.ru/multimedia/c1200/1025296861.jpg'},
    {id: '89', title: 'Noyan Премимум. Абрикос', price: 155, description: '1л.', image: 'https://cdn1.ozone.ru/multimedia/c1000/1023214244.jpg'},
    {id: '90', title: 'Noyan Премимум. Персик', price: 160, description: '1л.', image: 'https://avatars.mds.yandex.net/get-eda/1962206/43ce1a0eac8ce865de4a6a9ae8ab04c9/800x800nocrop'},
    {id: '91', title: 'Noyan Премимум. Апельсин', price: 180, description: '1л.', image: 'https://foodmall.ru/upload/resize_cache/iblock/9c3/7b6sc9h2pxp8kln72l8czx3yghev4orf/1200_1200_140cd750bba9870f18aada2478b24840a/3659_1.jpg'},
    {id: '92', title: 'Noyan Премимум. Мультифрукт', price: 180, description: '1л.', image: 'https://main-cdn.sbermegamarket.ru/big1/hlr-system/1514739414/100024018216b0.jpeg'},
    {id: '93', title: 'Noyan Премимум. Облепиха', price: 200, description: '1л.', image: 'https://www.sas.am/upload/iblock/122/000684.jpg'},
    {id: '94', title: 'Noyan Премимум. Кизил', price: 200, description: '1л.', image: 'https://cdn-img.perekrestok.ru/i/800x800-fit/xdelivery/files/08/d2/3106a36fb26xdaa3dd1a7d79b0fd.jpg'},
    {id: '95', title: 'Noyan. Компот из вишни', price: 185, description: '', image: ''},
    {id: '96', title: 'Noyan. Компот из айвы', price: 185, description: '', image: ''},
    {id: '97', title: 'Noyan. Компот из ежевики', price: 185, description: '', image: ''},
    {id: '98', title: 'Noyan. Компот из клубники', price: 185, description: '', image: ''},
    {id: '99', title: 'Tamara fruit. Компот из ежевики', price: 185, description: '', image: ''},
    {id: '100', title: 'Tamara fruit. Компот из персика', price: 185, description: '', image: ''},
    {id: '101', title: 'Tamara fruit. Компот из терна', price: 185, description: '', image: ''},
    {id: '102', title: 'Tamara fruit. Компот из смородины', price: 185, description: '', image: ''},
    {id: '103', title: 'Tamara fruit. Компот из айвы', price: 185, description: '', image: ''},
    {id: '104', title: 'Ecofood. Компот из айвы', price: 185, description: '', image: ''},
    {id: '105', title: 'Natakhtari. Лимонад', price: 100, description: '1л, пэт, вкусы: груша, тархун, апельсин, крем-сливки, лимон, фейхоа', image: 'https://avatars.mds.yandex.net/get-mpic/5303294/img_id1622355467941350856.jpeg/orig'},
    {id: '106', title: 'Natakhtari. Лимонад', price: 12000, description: '', image: ''},
    {id: '107', title: 'Джермук. Минеральная вода с лимоном', price: 100, description: '1л', image: 'https://bon-jur.ru/wp-content/uploads/2022/08/джермук-лимон-1-600x600.png'},
    {id: '108', title: 'Джермук. Минеральная вода', price: 100, description: '1л', image: 'https://cdn1.ozone.ru/s3/multimedia-w/c1000/6106332692.jpg'},
    {id: '109', title: 'CocaCola', price: 75, description: '0,5л - 75руб, 0.9л - 100руб, 1.5л - 180руб, сделанное в Армении, в наличии есть ваниль', image: 'https://api.magonline.ru/thumbnail/740x494/28/020/28020.png'},
    {id: '110', title: 'Fanta', price: 75, description: '0.5 - 75руб', image: ''},
    {id: '111', title: 'Дилиджан', price: 12000, description: '', image: ''},
    {id: '112', title: 'Noy', price: 12000, description: '', image: ''},
    {id: '113', title: '7up', price: 1, description: '', image: ''},
    {id: '114', title: 'Burn', price: 1, description: '', image: ''},
    {id: '115', title: 'Adrenaline Rush', price: 1, description: '', image: ''},
    {id: '116', title: 'Голд Cold. Natural Mineral Water', price: 1, description: '', image: ''},
    {id: '117', title: 'Сок Добрый', price: 1, description: '', image: ''},
    {id: '118', title: 'Рычалсу', price: 1, description: '', image: ''},
    {id: '119', title: 'Sprite', price: 1, description: '', image: ''},
    {id: '120', title: 'Kilikia. Тархун', price:65, description: 'лимонад', image: ''},
    {id: '121', title: 'Kilikia. Лайм', price: 65, description: 'лимонад', image: ''},
    {id: '122', title: 'Kilikia. Апельсин', price:65, description: 'лимонад', image: ''},
    {id: '123', title: 'Noy. Дюшес', price: 75, description: '', image: ''},
    {id: '124', title: 'Noy. Тархун', price: 75, description: '', image: ''},
    {id: '125', title: 'JoSo. Лимонад', price: 85, description: '', image: ''},
    {id: '126', title: 'Чито грито. Фейхоа', price: 85, description: 'лимонад', image: ''},
    {id: '127', title: 'Pulpy', price: 75, description: 'сок с мякотью, со вкусом клубники и апельсина', image: ''},
    {id: '128', title: 'Jermuk.  Минеральная вода', price: 60, description: 'железная банка, ', image: ''},
    {id: '129', title: 'Добрый. Апельсин', price: 50, description: 'железная банка', image: ''},
    {id: '130', title: 'Добрый. Спрайт', price: 50, description: 'железная банка', image: ''},
    {id: '131', title: 'Добрый. Кола', price: 1, description: '', image: ''},
    {id: '132', title: 'Hay Cola. Кола, фанта, спрайт', price: 1, description: '', image: ''},
    {id: '133', title: 'CocaCola Ваниль', price: 1, description: '', image: ''},
    {id: '134', title: 'bjni  с лимоном', price: 1, description: '', image: ''},
    {id: '135', title: 'PROSHIYAN FOOD. Маринад ассорти', price: 210, description: '950г', image: 'https://avatars.mds.yandex.net/get-mpic/4867510/img_id1191420468266153540.jpeg/orig'},
    {id: '136', title: 'PROSHIYAN FOOD. Консервированный нут', price: 310, description: '350г', image: 'data:image/jpeg;base64,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'},
    {id: '137', title: 'PROSHIYAN FOOD. Вешенки маринованные', price: 330, description: '500г', image: 'https://static.baza.farpost.ru/v/1642575688903_bulletin'},
    {id: '138', title: 'PROSHIYAN FOOD. Лечо', price: 310, description: '310руб - 650г , 255руб - 500г', image: 'https://avatars.mds.yandex.net/get-mpic/5220597/img_id8393626926321278572.jpeg/x332_trim'},
    {id: '139', title: 'PROSHIYAN FOOD. Томаты очищенные', price: 230, description: '630г', image: 'https://shop.samberi.com/upload/iblock/bfc/bfc06aa9a004f3e4a49db3d256f3353d.jpg'},
    {id: '140', title: 'PROSHIYAN FOOD. Керусус', price: 310, description: '620г', image: 'https://avatars.mds.yandex.net/get-mpic/4345877/img_id4592160619600973495.png/orig'},
    {id: '141', title: 'PROSHIYAN FOOD. Перец острый', price: 1, description: '500г', image: 'https://www.coffeemag.ru/photo_it/photomak200086.jpeg'},
    {id: '142', title: 'VilFood. Огурцы маринованные', price: 1, description: '', image: ''},
    {id: '143', title: 'VilFood. Черемша мариванованная', price: 380, description: '600гр.', image: 'https://img.b2b.trade/e03e35df-6c39-480b-9638-c7db45f9b573/-/smart_resize/500x500/-/quality/lightest/-/format/webp/'},
    {id: '144', title: 'VilFood. Шушан', price: 450, description: '720мл', image: 'https://marketyan.am/media/image/ac/7a/77/4850013280267.jpg'},
    {id: '145', title: 'Vital. Бутень', price: 400, description: '1л', image: 'https://img.napolke.ru/cache/resize/370/370/5,11715799607a44'},
    {id: '146', title: 'Vital. Стрелки чеснока маринованные', price: 250, description: '720г', image: 'https://шашлыкинавынос.рф/assets/images/products/257/chesnok-sajt.jpg'},
    {id: '147', title: 'Vital. Купена(синдрик)', price: 480, description: '980г', image: 'https://fastshashlik.ru/modules/catalog_items/uploads/middle/307.jpg'},
    {id: '148', title: 'Vital. Ассорти маринад', price: 330, description: '1л', image: 'https://fastshashlik.ru/modules/catalog_items/uploads/middle/305.jpg'},
    {id: '149', title: 'Vital. Зеленый фасоль', price: 1, description: '1л', image: 'https://armproducti.ru/imgtmp/orign_100_w/data/Vital/fasol.jpg'},
    {id: '150', title: 'Vital. Бамия', price: 260, description: '720гр', image: 'https://armprodukt.ru/wa-data/public/shop/products/04/01/104/images/213/213.600.jpg'},
    {id: '151', title: 'Tisok. Бутень маринованный', price: 400, description: '700гр', image: 'https://всявода.com/wp-content/uploads/2020/11/1382844483.png'},
    {id: '152', title: 'Tisok. Початки кукурузы', price: 430, description: '700гр', image: 'https://avatars.mds.yandex.net/get-mpic/4589539/img_id6889905616409799974.png/600x800'},
    {id: '152', title: 'Tisok. Бамия маринованная', price: 295, description: '600гр', image: 'https://img.napolke.ru/cache/resize/340/340/5,1b75ba9a31402c'},
    {id: '153', title: 'Tisok. Красный перец маринованный', price: 300, description: '730гр', image: 'https://sun9-88.userapi.com/impg/CFgKRG-ilhTfRf_esCMSeFleANcBU8gHsbXt0Q/Elw0U3cONSw.jpg?size=520x0&quality=95&sign=f4adb0cf26cacc8967cb788879f1e920'},
    {id: '154', title: 'Tisok. Икра баклажановая острая', price: 300, description: '730гр', image: 'https://img.napolke.ru/cache/resize/370/370/6,1b75a3005e26fc'},
    {id: '155', title: 'Tisok. Икра баклажановая', price: 1, description: '730гр', image: 'https://dariarmenii.ru/thumb/2/G83t1QoWh4DhkaB1C09UBg/750r750/d/20211102_141155.jpg'},
    {id: '156', title: 'Homeland. Бамия маринованная', price: 290, description: '500мл', image: 'https://cdn.100sp.ru/pictures/591389848'},
    {id: '157', title: 'Homeland. Стручковый перец маринованный', price: 270, description: 'в масле, 900мл', image: 'https://bon-jur.ru/wp-content/uploads/2022/05/-в-раст-масле-1-e1661859817974-600x600.png'},
    {id: '158', title: 'Homeland. Икра баклажановая острая', price: 240, description: '390г', image: 'https://static.parma.am/origin/product/1024/83644.jpg'},
    {id: '159', title: 'Homeland. Икра баклажановая', price: 240, description: '500мл', image: 'https://bon-jur.ru/wp-content/uploads/2022/05/икра-бакл-1.png'},
    {id: '160', title: 'Homeland. Аппетит', price: 250, description: '500мл', image: 'https://goodsp.ru/wa-data/public/shop/products/98/29/2998/images/4719/4719.970.jpg'},
    {id: '161', title: 'Homeland. Перечная паста', price: 180, description: 'острая, 200г', image: 'https://static.parma.am/origin/product/1024/94245.jpg'},
    {id: '162', title: 'Homeland. Иман Байалди', price: 1, description: '720мл', image: 'https://chayberry.ru/wa-data/public/shop/products/49/34/3449/images/10710/10710.970.jpg'},
    {id: '163', title: 'Homeland. Огурцы и помидоры маринованные', price: 1, description: '900мл', image: 'https://cdn.100sp.ru/pictures/591393302'},
    {id: '164', title: 'Homeland. Виноградные листья', price: 1, description: '720мл', image: 'https://chayberry.ru/wa-data/public/shop/products/48/34/3448/images/10708/10708.970.jpg'},
    {id: '165', title: 'Noyan. Бохи', price: 280, description: '570г', image: 'https://ethnopolis.ru/wp-content/uploads/2022/09/1010125.jpg'},
    {id: '166', title: 'Noyan. Бутень маринованный', price: 290, description: '560г', image: 'https://cdn1.ozone.ru/multimedia/1026314512.jpg'},
    {id: '167', title: 'Noyan. Маринованные огурцы', price: 220, description: '920г', image: 'https://avatars.mds.yandex.net/get-mpic/4509881/img_id6278985858391717852.jpeg/orig'},
    {id: '168', title: 'Noyan. Маринованные помидоры', price: 1, description: '920г', image: 'https://cdn1.ozone.ru/s3/multimedia-u/6129219762.jpg'},
    {id: '169', title: 'Noyan. Томаты в собственном соку', price: 1, description: '920г', image: 'https://cdn1.ozone.ru/s3/multimedia-f/6027995271.jpg'},
    {id: '170', title: 'Aiello. Аппетитные перчики маринованные', price: 210, description: '500г', image: 'https://tsiran.am/images/products/050059/591010e95010284ba4eec6bd27dd4812/764x600.JPG'},
    {id: '171', title: '', price: 1, description: '', image: ''},
    {id: '172', title: '', price: 1, description: '', image: ''},
    {id: '173', title: '', price: 1, description: '', image: ''},
    {id: '174', title: '', price: 1, description: '', image: ''},
    {id: '175', title: '', price: 1, description: '', image: ''},
    {id: '176', title: '', price: 1, description: '', image: ''},
    {id: '177', title: '', price: 1, description: '', image: ''},
    {id: '178', title: '', price: 1, description: '', image: ''},
    {id: '179', title: '', price: 1, description: '', image: ''},
    {id: '180', title: '', price: 1, description: '', image: ''},
    {id: '181', title: '', price: 1, description: '', image: ''},
    {id: '182', title: '', price: 1, description: '', image: ''},
    {id: '183', title: '', price: 1, description: '', image: ''},
    {id: '184', title: '', price: 1, description: '', image: ''},
    {id: '185', title: '', price: 1, description: '', image: ''},
    {id: '186', title: '', price: 1, description: '', image: ''},
    {id: '187', title: '', price: 1, description: '', image: ''},
    {id: '188', title: '', price: 1, description: '', image: ''},
    {id: '189', title: '', price: 1, description: '', image: ''},
    {id: '190', title: '', price: 1, description: '', image: ''},








]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
