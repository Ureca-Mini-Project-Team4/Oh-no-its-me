package com.uplus.eureka.util;


/**
 * JSP에서 데이터를 page navigation 형식으로 구성하기 위해 사용되는 클래스이다.
 */
public class PageUtility {
    int firstpagecount=0;
    int lastpagecount=0;

    int nextpagecount=0;				//다음 페이지
    int beforepagecount=0;			    //이전 페이지
    int currentpagecount=0;			    //현재 페이지
	
    int beforetenpage=0;				//이전 페이지
    int nexttenpage=0;					//다음 페이지

    int totalrowcount=0;				//총 row 개수
    int totalpagecount=0;				//총 페이지 수
    int displayrowcount=0;				//한 페이지당 보여줄 개수
    int pagePercount = 5;				//페이지 링크 거는 개수      << < 1 2 3 4 5 > >>
    String imagepath;
    String search;
    /**
     * 현재페이지와 경로 한번에 보여줄 열의 갯수를 세팅하는 생성자
     * @param displayrowcount 한 페이지에 보여줄 게시글 수
     * @param totalrowcount   조회해온 데이터의 전체 row수
     * @param currentpagecount 현재 페이지 
     * @param imagepath        이미지 경로 
     * @exception java.lang.Exception
     */
    public PageUtility(int displayrowcount, int totalrowcount, int currentpagecount, String imagepath)
    {
        this.displayrowcount = displayrowcount;
        this.totalrowcount = totalrowcount;
        this.currentpagecount = currentpagecount;
        this.imagepath = imagepath	;
        this.totalpagecount=totalrowcount/displayrowcount;
        if(totalrowcount%displayrowcount!=0){
          this.totalpagecount++;
        }
        
    }
   
    public String getCurrentPageCount()
    {
        return String.valueOf(currentpagecount);
    }
    /**
     * 목록에 출력할 page link를 구성한다.
     * @return 구성한 page 링크를 리턴
     */
    public String getPageBar()    {
  		
        StringBuffer sb=new StringBuffer();
        firstpagecount=((currentpagecount-1)/pagePercount*pagePercount)+1;
        lastpagecount=firstpagecount+pagePercount;

        beforetenpage=firstpagecount-pagePercount;
        beforetenpage= beforetenpage<1?1:beforetenpage;
        nexttenpage=lastpagecount;
        
        System.out.println("firstpagecount:"+firstpagecount);
        System.out.println("lastpagecount:"+lastpagecount);
        System.out.println("beforetenpage:"+beforetenpage);
        System.out.println("nexttenpage:"+nexttenpage);
        
        
        if(beforetenpage<1)     beforetenpage=1;
        if(nexttenpage>totalpagecount)
            nexttenpage=(((totalpagecount-1)/pagePercount)+1)*pagePercount;
        if(lastpagecount>totalpagecount)
            lastpagecount = totalpagecount+1;
		
        sb.append("<ul class='pagination   justify-content-center'>");
        sb.append("<li class='page-item' >");
        if(firstpagecount>pagePercount)
            sb.append("<a class='page-link'  href='#'  data-pg='1'>맨처음</a>");
        else
            sb.append("<a class='page-link .disabled'  href='#' disabled='disabled'>맨처음</a>");
        sb.append("</li>");
        
        
        if(((currentpagecount-1)/pagePercount*pagePercount)+1>beforetenpage)
            sb.append("<a  class='page-link'  href='#'  data-pg='"+beforetenpage+"'>이전</a>");
        else
        	 sb.append("<a class='page-link .disabled'  href='#' disabled='disabled'>이전</a>");


        
        
        for (int i = firstpagecount; i < lastpagecount; i++)
        {
        	sb.append("<li class='page-item'>");
            if(i<=totalpagecount)
            {
                if (i == currentpagecount)
                    sb.append("<a class='page-link .active' data-pg='"+i+"' href='#'>" + i + "</a>");
                else
                    sb.append("<a class='page-link' href='#'  data-pg='"+i+"'>" + i + "</a>");
              
            }
            sb.append("</li>");
        }
        
        sb.append("<li class='page-item'>");
        if(nexttenpage<((totalpagecount-1)/pagePercount+1)*pagePercount)
            sb.append("<a class='page-link' href='#' data-pg='"+ (nexttenpage)+ "'>Next</a>");
        else
            sb.append("<a class='page-link .disabled' href='#' disabled='disabled'>Next</a>");
        sb.append("</li>");
        
        if((((currentpagecount-1)/pagePercount)+1)*pagePercount < nexttenpage)
            sb.append("<a class='page-link' href='#' data-pg='"+ totalpagecount+ "'>맨끝</a>");
        else
        	sb.append("<a class='page-link .disabled' href='#'   disabled='disabled'>맨끝</a>");
        
        sb.append("</ul>");
      
        return sb.toString();
    }
    public String getTotalPageCount() {       return String.valueOf(totalpagecount);
    }
}