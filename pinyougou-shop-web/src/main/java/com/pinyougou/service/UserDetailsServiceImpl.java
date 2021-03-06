package com.pinyougou.service;

import com.pinyougou.pojo.TbSeller;
import com.pinyougou.sellergoods.service.SellerService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

/**
 * 认证类
 *
 * @author Chen
 * @created 2018-10-08-20:36.
 */
public class UserDetailsServiceImpl implements UserDetailsService {
    private SellerService sellerService;


    public void setSellerService(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 构建角色
        List<GrantedAuthority> grantedAuths = new ArrayList<GrantedAuthority>();
        grantedAuths.add(new SimpleGrantedAuthority("ROLE_SELLER"));

        // 得到商家对象
        TbSeller seller= sellerService.findOne(username);
        System.out.println("seller的值是：---" + seller.getPassword() + "，当前方法=UserDetailsServiceImpl.loadUserByUsername()");
        //return new User(username, "123456", grantedAuths);
        if (seller!=null){
            if(seller.getStatus().equals("1")){
                return new User(username, seller.getPassword(), grantedAuths);
            }else{
                return null;
            }
        }else{
            return null;
        }


    }
}
