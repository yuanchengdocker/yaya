-- ----------------------------
--  Table structure for `member`
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `sex` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createTime` date DEFAULT NULL,
  `creater` varchar(255) DEFAULT NULL,
  `updateTime` date DEFAULT NULL,
  `updater` varchar(255) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=21323258;

-- ----------------------------
--  Records of `member`
-- ----------------------------
BEGIN;
INSERT INTO `member` VALUES ('10006', 'yuan4', '0', '0', '13530096049', null, '2017-10-28', null, '2017-10-28', null, '0'), ('10008', 'yuan6', null, null, '1234', null, null, null, null, null, null), ('10011', 'yuan9', null, null, '323442', null, null, null, null, null, null), ('111111', 'yuan10', null, null, 'dsfa', null, null, null, null, null, null), ('21323244', 'yuan11', null, null, 'dsfafdf', null, null, null, null, null, null), ('21323245', 'dsaf', null, null, '1353009604', null, null, null, null, null, null), ('21323246', 'dsfads', null, null, '135300960', null, null, null, null, null, null), ('21323247', '袁成得到的', null, null, '123', null, null, null, null, null, null), ('21323248', '袁成', null, '35', '135', null, null, null, null, null, null), ('21323249', '袁成2', null, '36', '136', null, null, null, null, null, null), ('21323255', '袁成', null, '35', '135', null, null, null, null, null, null), ('21323256', '袁成2', null, '36', '136', null, null, null, null, null, null), ('21323257', '袁成3', null, '37', '137', null, null, null, null, null, null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `sex` varchar(45) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `create_user` varchar(45) DEFAULT NULL,
  `update_user` varchar(45) DEFAULT NULL,
  `password` varchar(100) NOT NULL DEFAULT '123456' COMMENT '默认为员工电话',
  `type` int(10) NOT NULL DEFAULT '1' COMMENT '0:root管理员，1:普通员工',
  `phone` varchar(50) NOT NULL,
  `head_img` varchar(200) DEFAULT NULL COMMENT '头像',
  `address` varchar(200) NOT NULL COMMENT '门店地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=21323258;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('4', 'yuan', '25', '1', null, null, null, null, '12345', '1', '13530096049', null, '2');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;

