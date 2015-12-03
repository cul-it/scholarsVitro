package edu.cornell.mannlib.vitro.webapp.controller.edit.ajax;

import static edu.cornell.mannlib.vitro.webapp.modelaccess.ModelAccess.ReasoningOption.ASSERTIONS_ONLY;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.google.gson.annotations.Expose;

import java.lang.reflect.Type;

import edu.cornell.mannlib.vitro.webapp.beans.VClass;
import edu.cornell.mannlib.vitro.webapp.controller.VitroRequest;
import edu.cornell.mannlib.vitro.webapp.controller.edit.ClassPageController;
import edu.cornell.mannlib.vitro.webapp.dao.VClassDao;
import edu.cornell.mannlib.vitro.webapp.dao.WebappDaoFactory;
import edu.cornell.mannlib.vitro.webapp.modelaccess.ModelAccess;

public class GetClassHierarchyTree extends HttpServlet {
	
	private static final Log log = LogFactory.getLog(GetClassHierarchyTree.class.getName());
	
	private List<VClass> getVClassesForURIList(List<String> vclassURIs, VClassDao vcDao) {
        List<VClass> vclasses = new ArrayList<VClass>();
        Iterator<String> urIt = vclassURIs.iterator();
        while (urIt.hasNext()) {
            String vclassURI = urIt.next();
            VClass vclass = vcDao.getVClassByURI(vclassURI);
            if (vclass != null) {
                vclasses.add(vclass);
            }
        }
        return vclasses;
    }
	
	private List<VClass> getSubclasses(VClassDao vcDao, VClass root) {
		return getVClassesForURIList(
                vcDao.getSubClassURIs(root.getURI()), vcDao);
	}
	
	private List<VClass> getSuperclasses(VClassDao vcDao, VClass root) {
		return getVClassesForURIList(
				vcDao.getSuperClassURIs(root.getURI(), false), vcDao);
	}
	
	private ClassHierarchyNode generateFullTree(VClass root, VClassDao vcDao) {
		List<VClass> superclasses = getSuperclasses(vcDao, root);
		ClassHierarchyNode currentNode = new ClassHierarchyNode(root);
		log.debug(currentNode.getVClass().getName());
		while(superclasses.size() > 0) {
			superclasses = getSuperclasses(vcDao, currentNode.getVClass());
			currentNode = new ClassHierarchyNode(superclasses.get(0));
		}
		return generateSubTree(currentNode.getVClass(), vcDao);
	}
	
	private ClassHierarchyNode generateSubTree(VClass root, VClassDao vcDao) {
		List<VClass> subclasses = getSubclasses(vcDao, root);
		ClassHierarchyNode currentNode = new ClassHierarchyNode(root);
		for(VClass subclass : subclasses) {
			currentNode.addChild(generateSubTree(subclass, vcDao));
		}
		return currentNode;
	}
	
	public class VClassSerializer implements JsonSerializer<VClass> {
		@Override
		public JsonElement serialize(VClass src, Type typeOfSrc, JsonSerializationContext context) {
			return new JsonPrimitive(src.getName());
		}
	}
	
	public String jsonTree(VClass root, VClassDao vcDao) {
		
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.excludeFieldsWithoutExposeAnnotation();
		gsonBuilder.registerTypeAdapter(VClass.class, new VClassSerializer());
		Gson gson = gsonBuilder.create();
		ClassHierarchyNode tree = GetClassHierarchyUtils.generateFullTree(root, vcDao);
		return gson.toJson(tree);
	}
	
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
		VitroRequest request = new VitroRequest(req);
        
        WebappDaoFactory wadf = ModelAccess.on(getServletContext()).getWebappDaoFactory(ASSERTIONS_ONLY);
        
        VClassDao vcwDao = wadf.getVClassDao();
        VClass vcl = (VClass)vcwDao.getVClassByURI(request.getParameter("uri"));
		res.getWriter().println(jsonTree(vcl, vcwDao));
	}
}