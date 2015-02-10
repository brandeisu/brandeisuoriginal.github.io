import java.io.*;
import java.util.*;

/* Prakhar Sahay 02/03/2015

This will switch all HTML files from a local base URL to an online base URL and vice versa.
*/

public class ToggleLocality{
	public static final String LOCAL="/Users/Prakhar/Documents/GitHub/brandeisu.github.io/";

	public static final String ONLINE="http://brandeisu.github.io/";
	public static final String[] DIRS={"club_support","events","meet_the_team","resources","senate","transportation"};
	public static String path="";

	public static void main(String[] args){
		if(args.length==1){
			path=args[0];
		}

		toggle("C:"+LOCAL+"index.html");
		toggle("C:"+LOCAL+"html/index.html");

		// go through all DIRS strings
		for(String folder : DIRS){
			toggle(new File("C:"+LOCAL+"html/"+folder).listFiles());
		}
	}

	public static void toggle(File[] fs){// toggle every f in fs
		for(File f : fs){
			toggle(f);
		}
	}

	public static void toggle(String s){// string to f
		toggle(new File(s));	
	}

	// read in, print out (toggling '<base' line)
	public static void toggle(File f){
		try{
			Scanner readFile=new Scanner(f);
			List<String> al=new ArrayList<String>();
			while(readFile.hasNextLine()){
				String line=readFile.nextLine();
				if(line.length()>6 && line.substring(0,6).equals("<base ")){
					int i=line.indexOf("\"");
					int i2=line.lastIndexOf("\"");
					String current=line.substring(i+1,i2);
					al.add(line.substring(0,i+1)+getPath(current)+line.substring(i2));
				}else{
					al.add(line);
				}
			}
			PrintStream ps=new PrintStream(f);
			for(String s : al){
				ps.println(s);
			}
			System.out.println("Toggled file "+f.getName()+" successfully.");
		}catch(FileNotFoundException e){
			System.out.println("Mudkip is blue.");
		}
	}

	public static String getPath(String s){
		switch(path){
			case "local":return LOCAL;
			case "online":return ONLINE;
			default:return s.equals(LOCAL)?ONLINE:LOCAL;
		}
	}
}