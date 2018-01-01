use yuan;
-- ----------------------------
--  Table structure for `member`
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `integral` int(10) DEFAULT '0',
  `remark` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `create_user` varchar(45) DEFAULT NULL,
  `update_user` varchar(45) DEFAULT NULL,
  `deleted` tinyint(5) NOT NULL DEFAULT '1' COMMENT '默认0为删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=21323258;

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
  `deleted` tinyint(5) NOT NULL DEFAULT '1' COMMENT '默认0为删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=21323258;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('10000', 'yuan', '25', '1', null, null, null, null, 'cheng', '0', '13530096049', null, '2',1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;


